import { platforms, type NewPlatform } from './platform';
import { reports } from './report';
import { relations, type InferModel } from 'drizzle-orm';
import { integer, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { genres, type NewGenre } from './genre';
import { companies, type NewCompany } from './company';

export const games = pgTable('games', {
	id: integer('id').primaryKey(),
	name: text('title').notNull(),
	releaseDate: timestamp('release_date'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const gamesRelations = relations(games, ({ many }) => ({
	reports: many(reports),
	platforms: many(platforms),
	genres: many(genres)
}));

export const gamesToReports = pgTable(
	'games_to_reports',
	{
		gameId: integer('game_id')
			.notNull()
			.references(() => games.id),
		reportId: integer('report_id')
			.notNull()
			.references(() => reports.id)
	},
	(t) => ({
		pk: primaryKey(t.gameId, t.reportId)
	})
);

export const gamesToPlatforms = pgTable(
	'games_to_platforms',
	{
		gameId: integer('game_id')
			.notNull()
			.references(() => games.id),
		platformId: integer('platform_id')
			.notNull()
			.references(() => platforms.id)
	},
	(t) => ({
		pk: primaryKey(t.gameId, t.platformId)
	})
);

export const gamesToGenres = pgTable(
	'games_to_genres',
	{
		gameId: integer('game_id')
			.notNull()
			.references(() => games.id),
		genreId: integer('genre_id')
			.notNull()
			.references(() => genres.id)
	},
	(t) => ({
		pk: primaryKey(t.gameId, t.genreId)
	})
);

export const gamesToCompanies = pgTable(
	'games_to_companies',
	{
		gameId: integer('game_id')
			.notNull()
			.references(() => games.id),
		companyId: integer('company_id')
			.notNull()
			.references(() => companies.id)
	},
	(t) => ({
		pk: primaryKey(t.gameId, t.companyId)
	})
);

export type Game = InferModel<typeof games>;

type GameForInsertion = InferModel<typeof games, 'insert'>;

//require ID
export type NewGame = {
	id: number;
	name: string;
	releaseDate?: Date;
};

export type FullGame = NewGame & {
	genres: NewGenre[];
	companies: NewCompany[];
	platforms: NewPlatform[];
};
