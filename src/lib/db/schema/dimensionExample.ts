import { dimensions } from './dimension';
import { reports } from './report';
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const dimensionExamples = pgTable('dimension_examples', {
	id: serial('id').primaryKey(),
	dimensionId: integer('dimension_id').notNull(),
	reportId: integer('report_id').notNull(),
	example: text('example').default('')
});

export const dimensionExamplesRelations = relations(dimensionExamples, ({ one }) => ({
	dimension: one(dimensions, {
		fields: [dimensionExamples.dimensionId],
		references: [dimensions.id]
	}),
	report: one(reports, {
		fields: [dimensionExamples.reportId],
		references: [reports.id]
	})
}));

export type NewDimensionExample = InferInsertModel<typeof dimensionExamples>;

export type DimensionExample = InferSelectModel<typeof dimensionExamples>;

export type PlainDimensionExample = {
	included: boolean;
	example: string;
};
