import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const reportId: number = +params.reportId;
	const examples = await db.query.dimensionExamples.findMany({
		where: (dimensionExamples, { eq }) => eq(dimensionExamples.reportId, reportId),
		with: {
			dimension: true
		}
	});

	return json(examples);
};
