import { env } from '$env/dynamic/private';
import type { NewCompany } from '$lib/db/schema/company';
import type { FullGame } from '$lib/db/schema/game';
import type { NewGenre } from '$lib/db/schema/genre';
import type { NewPlatform } from '$lib/db/schema/platform';
import { error, json } from '@sveltejs/kit';

export async function igdbAuth() {
	const response = await fetch(
		`https://id.twitch.tv/oauth2/token?client_id=${env.TWITCH_CLIENT_ID}&client_secret=${env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
		{
			method: 'POST'
		}
	);
	const data = await response.json();
	return data;
}

export async function searchForGames(name: string) {
	const data = await igdbAuth();
	const accessToken = data.access_token;

	if (!accessToken) throw error(500, 'Error authenticating with IGDB');

	const gamesResponse = await fetch('https://api.igdb.com/v4/games', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': env.TWITCH_CLIENT_ID,
			Authorization: `Bearer ${accessToken}`
		},
		body: `fields id, name, summary, genres.id, genres.name, involved_companies.company.id, involved_companies.company.name, platforms.id, platforms.name, first_release_date, cover.image_id; search "${name}";`
	});
	if (gamesResponse.status == 429)
		throw error(
			429,
			'Too many requests, try again later. If the error persists, let us know at pgpaisdev@gmail.com'
		);
	if (gamesResponse.status !== 200) throw error(500, 'Error fetching games');

	type dataType = {
		id: number;
		name: string;
		summary: string;
		cover: { image_id: string };
		genres: { id: number; name: string }[];
		involved_companies: { company: { id: number; name: string } }[];
		platforms: { id: number; name: string }[];
		first_release_date: number;
	};

	const gamesData: dataType[] = await gamesResponse.json();
	console.log(gamesData);

	const games = gamesData.map((game) => ({
		id: game.id,
		name: game.name,
		description: game.summary,
		imgUrl: game.cover
			? 'https://images.igdb.com/igdb/image/upload/t_cover_big/' + game.cover.image_id + '.png'
			: undefined,
		genres: game.genres?.map((genre: NewGenre) => ({
			id: genre.id,
			name: genre.name
		})),
		companies: game.involved_companies?.map((involved_company: { company: NewCompany }) => ({
			id: involved_company.company.id,
			name: involved_company.company.name
		})),
		platforms: game.platforms?.map((platform: NewPlatform) => ({
			id: platform.id,
			name: platform.name
		})),
		releaseDate: game.first_release_date
	}));

	return json(games);
}

export async function getGameInfoForInsertion(id: number) {
	const data = await igdbAuth();
	const accessToken = data.access_token;

	if (!accessToken) return new Response('Error authenticating with IGDB', { status: 500 });

	const gamesResponse = await fetch('https://api.igdb.com/v4/games', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': env.TWITCH_CLIENT_ID,
			Authorization: `Bearer ${accessToken}`
		},
		body: `fields id, name, summary, genres.id, genres.name, involved_companies.company.id, involved_companies.company.name, platforms.id, platforms.name, first_release_date, cover.image_id; where id = ${id};`
	});
	console.log('response: ' + gamesResponse);
	if (gamesResponse.status !== 200) return new Response('Error fetching game', { status: 500 });

	const gamesData = await gamesResponse.json();
	console.log(gamesData);
	const returnData: FullGame = {
		id: gamesData[0].id,
		name: gamesData[0].name,
		description: gamesData[0].summary,
		releaseDate: gamesData[0].first_release_date,
		imgUrl: gamesData[0].cover
			? 'https://images.igdb.com/igdb/image/upload/t_cover_big/' +
			  gamesData[0].cover.image_id +
			  '.png'
			: undefined,
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

	return json(returnData);
}

export async function GetGameCover(id: string) {
	const data = await igdbAuth();
	const accessToken = data.access_token;

	if (!accessToken) return new Response('Error authenticating with IGDB', { status: 500 });

	fetch('https://api.igdb.com/v4/covers', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': env.TWITCH_CLIENT_ID,
			Authorization: `Bearer ${accessToken}`
		},
		body: `fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width; where game.id = ${id}`
	})
		.then((response) => {
			console.log(response.json());
		})
		.catch((err) => {
			console.error(err);
		});
}
