import { env } from '$env/dynamic/private';
import { igdbAuth, searchForGames } from '$lib/igdb/igdb';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
	// return new Response('Not implemented', { status: 501 });

	const name = url.searchParams.get('name');

	if (!name) return new Response('No name provided', { status: 400 });

	

	return searchForGames(name);
};
