import { env } from '$env/dynamic/private';
import type { NewCompany } from '$lib/db/schema/company';
import type { FullGame, NewGame } from '$lib/db/schema/game';
import type { NewGenre } from '$lib/db/schema/genre';
import type { NewPlatform } from '$lib/db/schema/platform';
import { json } from '@sveltejs/kit';

export async function igdbAuth() {
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

export async function searchForGames(name: string) {
	const accessToken = await igdbAuth();

	if (!accessToken) return new Response('Error authenticating with IGDB', { status: 500 });

	const gamesResponse = await fetch('https://api.igdb.com/v4/games', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': env.TWITCH_CLIENT_ID,
			Authorization: `Bearer ${accessToken}`
		},
		body: `fields name; search "${name}";`
	});
	if (gamesResponse.status !== 200) return new Response('Error fetching games', { status: 500 });

	type dataType = {
		id: number;
		name: string;
	};

	const gamesData: dataType = await gamesResponse.json();
	console.log(json(gamesData));

	return json(gamesData);
}

export async function getGameInfoForInsertion(id: number) {
	const accessToken = await igdbAuth();

	if (!accessToken) return new Response('Error authenticating with IGDB', { status: 500 });

	const gamesResponse = await fetch('https://api.igdb.com/v4/games', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': env.TWITCH_CLIENT_ID,
			Authorization: `Bearer ${accessToken}`
		},
		body: `fields name, genres.id, genres.name, involved_companies.company.id, involved_companies.company.name, platforms.id, platforms.name, first_release_date; search id = "${id}";`
	});

	if (gamesResponse.status !== 200) return new Response('Error fetching game', { status: 500 });

	const gamesData = await gamesResponse.json();
	const returnData: FullGame = {
		id: gamesData[0].id,
		name: gamesData[0].name,
		releaseDate: gamesData[0].first_release_date,
		genres: gamesData[0].genres.map((genre: NewGenre) => ({
			id: genre.id,
			name: genre.name
		})),
		companies: gamesData[0].involved_companies.map((involved_company: { company: NewCompany }) => ({
			id: involved_company.company.id,
			name: involved_company.company.name
		})),
		platforms: gamesData[0].platforms.map((platform: NewPlatform) => ({
			id: platform.id,
			name: platform.name
		}))
	};

	console.log(json(returnData));
	return json(returnData);
}
