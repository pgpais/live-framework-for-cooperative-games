import db from '$lib/db';
import {
	games,
	gamesToGenres,
	genres,
	type GameWithNumberOfReports,
	type GameWithReports,
	type ReportWithGames,
	gamesToCompanies,
	companies,
	gamesToPlatforms,
	platforms,
	reports
} from '$lib/db/schema';
import { eq, sql, and } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, depends }) => {
	depends('url');

	const pageParam = url.searchParams.get('page');
	const pageSizeParam = url.searchParams.get('pageSize');

	const page = pageParam && !Number.isNaN(+pageParam) ? +pageParam : 0;
	const pageSize = pageSizeParam && !Number.isNaN(+pageSizeParam) ? +pageSizeParam : 10;

	const companyParam = url.searchParams.get('company');
	const genreParam = url.searchParams.get('genre');
	const platformParam = url.searchParams.get('platform');

	const company = companyParam && !Number.isNaN(+companyParam) ? +companyParam : 0;
	const genre = genreParam && !Number.isNaN(+genreParam) ? +genreParam : 0;
	const platform = platformParam && !Number.isNaN(+platformParam) ? +platformParam : 0;

	const sq = await db
		.select({ gameId: reports.gameId, reportsCount: sql`count(*)`.as('reportsCount') })
		.from(games)
		.leftJoin(reports, eq(reports.gameId, games.id))
		.where(eq(reports.gameId, games.id))
		.groupBy(reports.gameId)
		.as('sq');

	const gamesWithCountedReports = await db
		.select({ id: games.id, name: games.name, imgUrl: games.imgUrl, reportsCount: sq.reportsCount })
		.from(games)
		.leftJoin(sq, eq(games.id, sq.gameId))
		.innerJoin(gamesToCompanies, eq(games.id, gamesToCompanies.gameId))
		.innerJoin(gamesToGenres, eq(games.id, gamesToGenres.gameId))
		.innerJoin(gamesToPlatforms, eq(games.id, gamesToPlatforms.gameId))
		.where(
			and(
				company != 0 ? eq(gamesToCompanies.companyId, company) : sql`true`,
				genre != 0 ? eq(gamesToGenres.genreId, genre) : sql`true`,
				platform != 0 ? eq(gamesToPlatforms.platformId, platform) : sql`true`
			)
		)
		.groupBy(games.id, sq.reportsCount);

	console.log(gamesWithCountedReports);

	const companyFilters = await db.query.companies.findMany();

	const genreFilters = await db.query.genres.findMany();

	const platformFilters = await db.query.platforms.findMany();

	// const reports: ReportWithGames[] = await db.query.reports.findMany({
	// 	limit: pageSize,
	// 	offset: page,
	// 	with: {
	// 		game: true
	// 	}
	// });

	return {
		games: gamesWithCountedReports,
		companies: companyFilters,
		genres: genreFilters,
		platforms: platformFilters
	};
}) satisfies PageServerLoad;
