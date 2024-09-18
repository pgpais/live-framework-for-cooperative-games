import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Dimension, DimensionExample, Game } from '$lib/db/schema';

export const GET: RequestHandler = async ({ params }) => {
	const dimensionId: number = +params.dimensionId;

	console.log('fetching dimension with ID', dimensionId);

	const examples = await db.query.dimensionExamples.findMany({
		where: (dimensionExamples, { eq }) => eq(dimensionExamples.dimensionId, dimensionId),
		with: { report: true }
	});

	let foundGames = examples.map((example) => example.report.gameId);
	foundGames = foundGames.filter((gameId, index) => foundGames.indexOf(gameId) === index);

	const games = await db.query.games.findMany({
		where: (games, { inArray }) => inArray(games.id, foundGames)
	});

	const reportsByGame: (Game & { examples: DimensionExample[] })[] = [];

	for (const game of games) {
		const gameExamples = examples.filter((example) => example.report.gameId == game.id);
		const gameWithExamples = { ...game, examples: gameExamples };
		reportsByGame.push(gameWithExamples);
	}

	return json(reportsByGame);
};
