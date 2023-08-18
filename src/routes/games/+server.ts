import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
	// return new Response('Not implemented', { status: 501 });

	const name = url.searchParams.get('name');

	if (!name) return new Response('No name provided', { status: 400 });

	const accessToken = await igdbAuth();

	if (!accessToken) return new Response('Error authenticating with IGDB', { status: 500 });

	const gamesResponse = await fetch('https://api.igdb.com/v4/games', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': env.TWITCH_CLIENT_ID,
			Authorization: `Bearer ${accessToken}`
		},
		body: `fields name, involved_companies; search "${name}";`
	});
	if (gamesResponse.status !== 200) return new Response('Error fetching games', { status: 500 });

	const gamesData = await gamesResponse.json();
	console.log(gamesData);

	return json(gamesData);
};

async function igdbAuth() {
	const response = await fetch(
		`https://id.twitch.tv/oauth2/token?client_id=${env.TWITCH_CLIENT_ID}&client_secret=${env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
		{
			method: 'POST'
		}
	);
	const data = await response.json();
	console.log(data);
	return data.access_token;
}
