import { searchForGames } from '$lib/igdb/igdb';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	// return new Response('Not implemented', { status: 501 });

	const name = url.searchParams.get('name');

	if (!name) return new Response('No name provided', { status: 400 });

	return searchForGames(name);
};
