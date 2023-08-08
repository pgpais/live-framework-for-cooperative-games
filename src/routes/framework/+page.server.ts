import db from '../../db';
import type { FrameworkAuthorCategories } from '../../db/schema';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const framework: FrameworkAuthorCategories | undefined = await db.query.frameworks.findFirst({
		with: {
			author: true,
			categories: {
				with: {
					dimensions: {
						with: {
							category: true
						}
					},
					subCategories: true
				}
			}
		}
	});

	return { framework };
}) satisfies PageServerLoad;
