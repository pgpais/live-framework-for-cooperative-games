import { gamesToPlatforms } from './game';
import { relations, type InferModel } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const platforms = pgTable('platforms', {
	id: serial('id').primaryKey(),
	name: text('title').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const platformsRelations = relations(platforms, ({ many }) => ({
	games: many(gamesToPlatforms)
}));

export type Platform = InferModel<typeof platforms>;

export type NewPlatform = InferModel<typeof platforms, 'insert'>;
