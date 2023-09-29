import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const reportId = params.id ? +params.id : 1;

	const report = await db.query.reports.findFirst({
		where: (reports, { eq }) => eq(reports.id, reportId),
		with: {
			game: true,
			dimensionExamples: true
		}
	});
	return json(report);
};
