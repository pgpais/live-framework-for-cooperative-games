import { games } from '$lib/db/schema/game';
import { relations, type InferModel } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
	id: serial('id').primaryKey(),
	name: text('title').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const companiesRelations = relations(companies, ({ many }) => ({
	games: many(games)
}));

export type Company = InferModel<typeof companies>;

export type NewCompany = InferModel<typeof companies, 'insert'>;
