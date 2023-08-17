import { dimensions } from './dimension';
import { reports } from './report';
import { relations, type InferModel } from 'drizzle-orm';
import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const dimensionExamples = pgTable('dimension_examples', {
	id: serial('id').primaryKey(),
	dimensionId: serial('dimension_id')
		.references(() => dimensions.id)
		.notNull(),
	reportId: serial('report_id')
		.references(() => reports.id)
		.notNull(),
	included: boolean('included').default(false),
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

export type NewDimensionExample = InferModel<typeof dimensionExamples, 'insert'>;

export type DimensionExample = InferModel<typeof dimensionExamples>;

export type PlainDimensionExample = {
	included: boolean;
	example: string;
};
