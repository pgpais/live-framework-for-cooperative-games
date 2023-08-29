import { gamesToPlatforms } from './game';
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const platforms = pgTable('platforms', {
	id: integer('id').primaryKey(),
	name: text('title').notNull()
});

export const platformsRelations = relations(platforms, ({ many }) => ({
	games: many(gamesToPlatforms)
}));

export type Platform = InferSelectModel<typeof platforms>;

export type NewPlatform = InferInsertModel<typeof platforms>;
