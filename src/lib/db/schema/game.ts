import { reports } from './report';
import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const games = pgTable('games', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const gamesRelations = relations(games, ({ many }) => ({
	reports: many(reports)
}));
