import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	// const report = await db.query.reports.findFirst({
	// 	where: (reports, { eq }) => eq(reports.id, reportId),
	// 	with: {
	// 		game: true,
	// 		dimensionExamples: true
	// 	}
	// });

	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.username, params.username)
	});
	return json(user);
};
