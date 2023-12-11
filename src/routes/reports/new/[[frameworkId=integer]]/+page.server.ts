import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { reportSchema, type ReportSchema, type CategoryReportSchema } from '$lib/schemas/report';
import { fail, redirect } from '@sveltejs/kit';
import db from '$lib/db';
import { reports } from '$lib/db/schema/report';
import { dimensionExamples, type NewDimensionExample } from '$lib/db/schema/dimensionExample';
import { getGameInfoForInsertion } from '$lib/igdb/igdb';
import {
	games,
	type FullGame,
	gamesToGenres,
	gamesToCompanies,
	gamesToPlatforms,
	type NewGame
} from '$lib/db/schema/game';
import { companies } from '$lib/db/schema/company';
import { genres, type Genre } from '$lib/db/schema/genre';
import { platforms } from '$lib/db/schema/platform';
import { insertGameSchema } from '$lib/schemas/game';
import { sql } from 'drizzle-orm';
import type { FullFramework } from '$lib/db/schema';

export const load = (async ({ fetch, locals, params }) => {
	const session = await locals.auth.validate();
	console.log('session', session);
	if (!session) {
		throw redirect(302, '/notLoggedIn');
	}

	const frameworkId = params.frameworkId ? +params.frameworkId : 1;

	const form = await superValidate(reportSchema);
	const gameForm = await superValidate(insertGameSchema);
	const framework = await fetchFramework();

	async function fetchFramework() {
		const response = await fetch(`/api/frameworks/full/${frameworkId}`);
		const data: FullFramework = await response.json();

		return data;
	}

	return { form, gameForm, framework };
}) satisfies PageServerLoad;

export const actions = {
	newReport: async ({ request, locals }) => {
		const form = await superValidate(request, reportSchema);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}
		const session = await locals.auth.validate();

		if (!session) {
			return fail(401, { message: 'Unauthorized', form });
		}

		const report = form.data;

		let categoryValidated = false;
		console.log('report.categories', report.categories);
		for (const category of report.categories) {
			categoryValidated = validateCategory(category);
			if (categoryValidated) break;
		}

		if (!categoryValidated) {
			return fail(400, {
				message: 'At least one dimension of any category must be included',
				form
			});
		}

		const reportId = await uploadReport(form.data, session?.user.userId);

		throw redirect(303, '/reports/' + reportId);
		//TODO: Instead of redirect, send an alert to the user that the report was submitted with a button that redirects to the report page
	},
	newGame: async ({ request, locals }) => {
		const form = await superValidate(request, insertGameSchema);
		console.log('form', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		const session = await locals.auth.validate();
		if (!session) {
			return fail(401, { message: 'Unauthorized', form });
		}

		const game: NewGame = form.data;

		const minId = await db
			.select({
				minId: sql`min(${games.id})`.mapWith(games.id)
			})
			.from(games);

		game.id = minId[0].minId - 1;
		console.log('POSTING GAME:', game);

		const insert = await db
			.insert(games)
			.values(game)
			.returning({ insertedId: games.id, name: games.name, description: games.description });

		const insertedGame: NewGame = {
			id: insert[0].insertedId,
			name: insert[0].name,
			description: insert[0].description
		};

		return { form, game: insertedGame };
	}
};

function getFullGameInfo(gameId: number) {
	return getGameInfoForInsertion(gameId);
}

function validateCategory(category: CategoryReportSchema): boolean {
	let categoryValidated = false;
	if (category.dimensions) {
		console.log('category.dimensions', category.dimensions);
		for (const dimension of category.dimensions) {
			if (dimension.included) {
				categoryValidated = true;
				break;
			}
		}
	}

	if (!categoryValidated) {
		if (category.subCategories && category.subCategories.length > 0) {
			for (const subCategory of category.subCategories) {
				categoryValidated = validateCategory(subCategory);
				if (categoryValidated) break;
			}
		}
	}

	return categoryValidated;
}

//TODO: Make a better name for this
// Gets all the subcategories and dimensions and pushes them into an array
// This is done so that we can insert them all at once in the db
function pushCategoryReportIntoArray(
	dimensionExamples: NewDimensionExample[],
	category: CategoryReportSchema,
	reportId: number
) {
	if (category.dimensions) {
		for (const dimension of category.dimensions) {
			if (dimension.included) {
				dimensionExamples.push({
					dimensionId: dimension.id,
					example: dimension.example,
					reportId,
					imageURL: dimension.imageURL
				});
				console.log('DB: Inserting dimension', dimension);
			}
		}
	}

	if (category.subCategories) {
		for (const subCategories of category.subCategories) {
			pushCategoryReportIntoArray(dimensionExamples, subCategories, reportId);
		}
	}
}

const uploadReport = async (report: ReportSchema, userId: string) => {
	let reportId = -1;
	let game: FullGame;
	if (report.gameId > 0) {
		const response = await getFullGameInfo(report.gameId);
		if (response.status !== 200) throw new Error('Error fetching game info');
		game = await response.json();
	}

	//TODO: improve this flow. How can we signal that there is a custom game?
	await db.transaction(async (tx) => {
		console.log('DB: Inserting report', report);

		if (game) {
			await tx.insert(genres).values(game.genres).onConflictDoNothing();

			await tx.insert(companies).values(game.companies).onConflictDoNothing();

			await tx.insert(platforms).values(game.platforms).onConflictDoNothing();

			if (game.imgUrl) {
				await tx
					.insert(games)
					.values({
						id: game.id,
						name: game.name,
						releaseDate: game.releaseDate,
						imgUrl: game.imgUrl,
						description: game.description
					})
					.onConflictDoUpdate({ target: games.id, set: { imgUrl: game.imgUrl } });
			} else {
				await tx
					.insert(games)
					.values({
						id: game.id,
						name: game.name,
						releaseDate: game.releaseDate,
						imgUrl: game.imgUrl,
						description: game.description
					})
					.onConflictDoNothing();
			}

			await tx
				.insert(gamesToGenres)
				.values(game.genres.map((genre) => ({ gameId: game.id, genreId: genre.id })))
				.onConflictDoNothing();

			await tx
				.insert(gamesToCompanies)
				.values(game.companies.map((company) => ({ gameId: game.id, companyId: company.id })))
				.onConflictDoNothing();

			await tx
				.insert(gamesToPlatforms)
				.values(game.platforms.map((platform) => ({ gameId: game.id, platformId: platform.id })))
				.onConflictDoNothing();
		}

		const insertedReport = await tx
			.insert(reports)
			.values({
				authorId: userId,
				gameId: game ? game.id : report.gameId,
				frameworkId: report.frameworkId,
				public: report.public,
				gameMode: report.gameMode,
				gameModeOther: report.gameModeOther,
				analysisLevel: report.analysisLevel,
				analysisLevelOther: report.analysisLevelOther,
				valueIdentification: report.valueIdentification,
				valueIdentificationOther: report.valueIdentificationOther,
				analysisType: report.analysisType,
				otherAnalysisType: report.otherAnalysisType,
				analysisDescription: report.analysisDescription,
				frameworkDifficulty: report.frameworkDifficulty,
				frameworkComments: report.frameworkComments
			})
			.returning({ insertedId: reports.id });
		console.log('DB: Inserted repot', insertedReport);
		const insertedReportId = insertedReport[0].insertedId;

		console.log('DB: Inserting dimensions');
		const newDimensionExamples: NewDimensionExample[] = [];
		for (const category of report.categories) {
			pushCategoryReportIntoArray(newDimensionExamples, category, insertedReportId);
			// await uploadReportCategory(category, insertedReportId, tx);
		}
		await tx.insert(dimensionExamples).values(newDimensionExamples);
		console.log('DB: Inserted dimensions');

		reportId = insertedReportId;
		console.log('DB: Finished report Insertion');
	});

	return reportId;
};
