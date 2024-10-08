import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const dimensionId = params.id ? +params.id : 1;

	console.log('fetching dimension with ID', dimensionId);

	const dimensions = await db.query.dimensions.findFirst({
		where: (dimensions, { eq }) => eq(dimensions.id, dimensionId),
		with: {
			category: {
				with: {
					superCategory: true
				}
			},
			dimensionExamples: {
				with: {
					report: {
						with: {
							game: true
						}
					}
				}
			}
		}
	});

	if (dimensions) {
		for (const example of dimensions.dimensionExamples) {
			if (!example.report.public) {
				dimensions.dimensionExamples = dimensions.dimensionExamples.filter(
					(e) => e.id !== example.id
				);
			}
		}
	}

	return json(dimensions);
};
