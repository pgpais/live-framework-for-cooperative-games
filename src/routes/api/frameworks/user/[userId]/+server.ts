import db from '$lib/db';
import { Framework } from '$lib/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const frameworks: Framework[] = await db.query.frameworks.findMany({
		where: (frameworks, { eq }) => eq(frameworks.authorId, params.userId)
	});
	return json(frameworks);
};
