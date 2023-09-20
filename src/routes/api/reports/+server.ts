import db from '$lib/db';
import { reportSchema } from '$lib/schemas/report';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
	const gameParam = url.searchParams.get('game');
	const gameId = gameParam && !Number.isNaN(+gameParam) ? +gameParam : 0;

	const gamesWithReports = await db.query.games.findFirst({
		where: (games, { eq }) => eq(games.id, gameId),
		with: {
			reports: {
				where: (reports, { eq }) => eq(reports.public, true),
				with: {
					author: true,
					dimensionExamples: {
						with: {
							dimension: true
						}
					}
				}
			}
		}
	});

	const reports = gamesWithReports?.reports;

	return json(reports);
};
