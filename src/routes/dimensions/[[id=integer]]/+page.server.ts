import db from '$lib/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const id = params.id ? +params.id : 1;

	const dimension = await db.query.dimensions.findFirst({
		where: (dimension, { eq }) => eq(dimension.id, id),
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
							game: true,
							author: true
						}
					}
				}
			}
		}
	});

	if (!dimension) {
		throw fail(404, { message: 'Dimension not found' });
	}

	return { dimension, category: dimension.category, examples: dimension.examples };
}) satisfies PageServerLoad;
