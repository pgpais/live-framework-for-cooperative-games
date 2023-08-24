import { platforms, type NewPlatform } from './platform';
import { reports } from './report';
import { relations, type InferModel } from 'drizzle-orm';
import { integer, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';
import { genres, type NewGenre } from './genre';
import { companies, type NewCompany } from './company';

export const games = pgTable('games', {
	id: integer('id').primaryKey(),
	name: text('title').notNull(),
	releaseDate: timestamp('release_date', { mode: 'string' }),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const gamesRelations = relations(games, ({ many }) => ({
	reports: many(reports),
	platforms: many(gamesToPlatforms),
	genres: many(gamesToGenres)
}));

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

export const gamesToPlatformsRelations = relations(gamesToPlatforms, ({ one }) => ({
	game: one(games, {
		fields: [gamesToPlatforms.gameId],
		references: [games.id]
	}),
	platform: one(platforms, {
		fields: [gamesToPlatforms.platformId],
		references: [platforms.id]
	})
}));

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

export const gamesToGenresRelations = relations(gamesToGenres, ({ one }) => ({
	game: one(games, {
		fields: [gamesToGenres.gameId],
		references: [games.id]
	}),
	genre: one(genres, {
		fields: [gamesToGenres.genreId],
		references: [genres.id]
	})
}));

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

export const gamesToCompaniesRelations = relations(gamesToCompanies, ({ one }) => ({
	game: one(games, {
		fields: [gamesToCompanies.gameId],
		references: [games.id]
	}),
	company: one(companies, {
		fields: [gamesToCompanies.companyId],
		references: [companies.id]
	})
}));

export type Game = InferModel<typeof games>;

export type NewGame = InferModel<typeof games, 'insert'>;

export type FullGame = NewGame & {
	genres: NewGenre[];
	companies: NewCompany[];
	platforms: NewPlatform[];
};
