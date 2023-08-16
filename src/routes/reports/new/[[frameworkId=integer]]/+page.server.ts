import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import {
	reportSchema,
	type DimensionReportSchema,
	type ReportSchema,
	type CategoryReportSchema
} from '$lib/schemas/report';
import { fail, redirect } from '@sveltejs/kit';
import db from '$lib/db';
import { reports } from '$lib/db/schema/report';
import { dimensionExamples, type NewDimensionExample } from '$lib/db/schema/dimensionExample';
import type { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';
import type { N } from 'drizzle-orm/query-promise.d-31db3408';
import type { M } from 'drizzle-orm/select.types.d-3ce070d1';

export const load = (async ({ params }) => {
	const frameworkId = params.frameworkId ? +params.frameworkId : 1;
	const framework = await GetFullFrameworkById(frameworkId);

	const form = await superValidate(framework, reportSchema);
	return { framework, form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, reportSchema);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated data
		uploadReport(form.data);

		// Yep, return { form } here too
		throw redirect(303, '/');
		// return { form };
	}
};

type Transaction = M<
	PostgresJsQueryResultHKT,
	typeof import('$lib/db/schema'),
	N<typeof import('$lib/db/schema')>
>;

const uploadDimensionExample = async (
	dimension: DimensionReportSchema,
	reportId: number,
	tx: Transaction
) => {
	const dimensionInReport: NewDimensionExample = {
		dimensionId: dimension.id, //TODO: Figure out how to make this mapping when fetching from DB
		included: dimension.included,
		example: dimension.example,
		reportId
	};
	console.log('DB: Inserting dimension', dimensionInReport);
	const ret = await tx
		.insert(dimensionExamples)
		.values(dimensionInReport)
		.returning({ insertedId: dimensionExamples.id });
	console.log('DB: Inserted dimension', { insertedId: ret[0].insertedId, ...dimensionInReport });
};

const uploadReportCategory = async (
	category: CategoryReportSchema,
	reportId: number,
	tx: Transaction
) => {
	for (const dimensionExample of category.dimensions) {
		await uploadDimensionExample(dimensionExample, reportId, tx);
	}

	if (category.subCategories) {
		for (const subCategories of category.subCategories) {
			await uploadReportCategory(subCategories, reportId, tx);
		}
	}
};

const uploadReport = async (report: ReportSchema) => {
	await db.transaction(async (tx) => {
		console.log('DB: Inserting report', report);
		const insertedReport = await tx
			.insert(reports)
			.values({ authorId: 1, gameId: 1, ...report })
			.returning({ insertedId: reports.id });
		console.log('DB: Inserted repot', insertedReport);
		const insertedReportId = insertedReport[0].insertedId;

		console.log('DB: Inserting dimensions');
		for (const category of report.categories) {
			await uploadReportCategory(category, insertedReportId, tx);
		}
	});
};
