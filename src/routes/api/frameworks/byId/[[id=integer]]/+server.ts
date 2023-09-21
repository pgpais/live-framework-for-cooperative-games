import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id ? +params.id : 0;

	const framework = await db.query.frameworks.findFirst({
		where: (frameworks, { eq }) => eq(frameworks.id, id),
		with: {
			categories: {
				with: {
					dimensions: true
				}
			}
		}
	});

	return json(framework);
};
