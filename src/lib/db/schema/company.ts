import { gamesToCompanies } from './game';
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
	id: integer('id').primaryKey(),
	name: text('title').notNull()
});

export const companiesRelations = relations(companies, ({ many }) => ({
	games: many(gamesToCompanies)
}));

export type Company = InferSelectModel<typeof companies>;

export type NewCompany = InferInsertModel<typeof companies>;
