import { gamesToGenres } from './game';
import { relations, type InferModel } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const genres = pgTable('genres', {
	id: integer('id').primaryKey(),
	name: text('title').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const genresRelations = relations(genres, ({ many }) => ({
	games: many(gamesToGenres)
}));

export type Genre = InferModel<typeof genres>;

export type NewGenre = InferModel<typeof genres, 'insert'>;
