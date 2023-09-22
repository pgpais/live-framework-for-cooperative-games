import db from '$lib/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { each } from 'svelte/internal';

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

	for (const example of dimension.dimensionExamples) {
		if (!example.report.public) {
			dimension.dimensionExamples = dimension.dimensionExamples.filter((e) => e.id !== example.id);
		}
	}

	return { dimension, category: dimension.category, examples: dimension.dimensionExamples };
}) satisfies PageServerLoad;
