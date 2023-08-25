import { gamesToPlatforms } from './game';
import { relations, type InferModel } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const platforms = pgTable('platforms', {
	id: integer('id').primaryKey(),
	name: text('title').notNull()
});

export const platformsRelations = relations(platforms, ({ many }) => ({
	games: many(gamesToPlatforms)
}));

export type Platform = InferModel<typeof platforms>;

export type NewPlatform = InferModel<typeof platforms, 'insert'>;
