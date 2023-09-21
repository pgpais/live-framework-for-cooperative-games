import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const dimensionId = params.id ? +params.id : 0;

	const dimension = await db.query.dimensions.findFirst({
		where: (dimensions, { eq }) => eq(dimensions.id, dimensionId),
		with: {
			dimensionExamples: true
		}
	});

	const examples = dimension?.dimensionExamples;
	return json(examples);
};
