import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Game, Report } from '$lib/db/schema';

export const GET: RequestHandler = async ({ params }) => {
	const reports: (Report & { game: Game })[] = await db.query.reports.findMany({
		where: (reports, { eq }) => eq(reports.authorId, params.userId),
		with: { game: true }
	});
	return json(reports);
};
