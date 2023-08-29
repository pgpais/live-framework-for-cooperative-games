import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
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
	gamesToPlatforms
} from '$lib/db/schema/game';
import { companies } from '$lib/db/schema/company';
import { genres } from '$lib/db/schema/genre';
import { platforms } from '$lib/db/schema/platform';

export const load = (async ({ params }) => {
	const frameworkId = params.frameworkId ? +params.frameworkId : 1;
	const framework = await GetFullFrameworkById(frameworkId);

	const form = await superValidate(framework, reportSchema);
	return { framework, form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }: { request: Request }) => {
		const form = await superValidate(request, reportSchema);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		uploadReport(form.data);

		throw redirect(303, '/');
		//TODO: Instead of redirect, send an alert to the user that the report was submitted with a button that redirects to the report page
	}
};

function getFullGameInfo(gameId: number) {
	return getGameInfoForInsertion(gameId);
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
					reportId
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

const uploadReport = async (report: ReportSchema) => {
	await db.transaction(async (tx) => {
		console.log('DB: Inserting report', report);

		const response = await getFullGameInfo(report.game.id);
		if (response.status !== 200) throw new Error('Error fetching game info');
		const game: FullGame = await response.json();

		await tx.insert(genres).values(game.genres).onConflictDoNothing();

		await tx.insert(companies).values(game.companies).onConflictDoNothing();

		await tx.insert(platforms).values(game.platforms).onConflictDoNothing();

		await tx
			.insert(games)
			.values({ id: game.id, name: game.name, releaseDate: game.releaseDate, imgUrl: game.imgUrl })
			.onConflictDoUpdate({ target: games.id, set: { imgUrl: game.imgUrl } });

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

		const insertedReport = await tx
			.insert(reports)
			.values({ authorId: 1, gameId: game.id, frameworkId: report.frameworkId })
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

		console.log('DB: Finished report Insertion');
	});
};
