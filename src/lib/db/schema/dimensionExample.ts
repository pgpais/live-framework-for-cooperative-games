import { dimensions } from './dimension';
import { reports } from './report';
import { relations, type InferModel } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const dimensionExamples = pgTable('dimension_examples', {
	id: serial('id')
		.primaryKey()
		.references(() => dimensions.id)
		.notNull(),
	reportId: serial('report_id')
		.references(() => reports.id)
		.notNull(),
	example: text('example').notNull()
});

export const dimensionExamplesRelations = relations(dimensionExamples, ({ one }) => ({
	dimension: one(dimensions, {
		fields: [dimensionExamples.id],
		references: [dimensions.id]
	}),
	report: one(reports, {
		fields: [dimensionExamples.reportId],
		references: [reports.id]
	})
}));

export type NewDimensionExample = InferModel<typeof dimensionExamples, 'insert'>;
