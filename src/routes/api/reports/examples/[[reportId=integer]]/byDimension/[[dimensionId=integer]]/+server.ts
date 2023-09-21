import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const reportId = params.reportId ? +params.reportId : 0;
	const dimensionId = params.dimensionId ? +params.dimensionId : 0;

	const report = await db.query.reports.findFirst({
		where: (reports, { eq }) => eq(reports.id, reportId),
		with: {
			dimensionExamples: {
				where: (dimensionExamples, { eq }) => eq(dimensionExamples.dimensionId, dimensionId)
			}
		}
	});

	const example = report?.dimensionExamples[0];

	return json(example);
};
