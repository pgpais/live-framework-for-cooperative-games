import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { reportSchema, type ReportSchema, type CategoryReportSchema } from '$lib/schemas/report';
import { fail, redirect } from '@sveltejs/kit';
import db from '$lib/db';
import { reports } from '$lib/db/schema/report';
import { dimensionExamples, type NewDimensionExample } from '$lib/db/schema/dimensionExample';

//TODO: move transactions out of sub methods (return array of dimension examples, then insert them all at once)

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

function pushCategory(
	dimensionExamples: NewDimensionExample[],
	category: CategoryReportSchema,
	reportId: number
) {
	for (const dimension of category.dimensions) {
		dimensionExamples.push({
			dimensionId: dimension.id,
			included: dimension.included,
			example: dimension.example,
			reportId
		});
		console.log('DB: Inserting dimension', dimension);
	}

	if (category.subCategories) {
		for (const subCategories of category.subCategories) {
			pushCategory(dimensionExamples, subCategories, reportId);
		}
	}
}

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
		const newDimensionExamples: NewDimensionExample[] = [];
		for (const category of report.categories) {
			pushCategory(newDimensionExamples, category, insertedReportId);
			// await uploadReportCategory(category, insertedReportId, tx);
		}
		await tx.insert(dimensionExamples).values(newDimensionExamples);
		console.log('DB: Inserted dimensions');
	});
};
