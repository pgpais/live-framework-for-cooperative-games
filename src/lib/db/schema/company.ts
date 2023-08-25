import { gamesToCompanies } from './game';
import { relations, type InferModel } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
	id: integer('id').primaryKey(),
	name: text('title').notNull()
});

export const companiesRelations = relations(companies, ({ many }) => ({
	games: many(gamesToCompanies)
}));

export type Company = InferModel<typeof companies>;

export type NewCompany = InferModel<typeof companies, 'insert'>;
