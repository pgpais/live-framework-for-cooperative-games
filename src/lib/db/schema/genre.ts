import { gamesToGenres } from './game';
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const genres = pgTable('genres', {
	id: integer('id').primaryKey(),
	name: text('title').notNull()
});

export const genresRelations = relations(genres, ({ many }) => ({
	games: many(gamesToGenres)
}));

export type Genre = InferSelectModel<typeof genres>;

export type NewGenre = InferInsertModel<typeof genres>;
