import {
	dimensionExamples,
	type DimensionExample,
	type DimensionExampleDetail
} from './dimensionExample';
import { categories, type Category } from './category';
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, integer, serial, pgEnum } from 'drizzle-orm/pg-core';

export const dimensionStatus = pgEnum('categories_status', [
	'unofficial',
	'merged',
	'declined',
	'official'
]);

export const dimensions = pgTable('dimensions', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	categoryId: integer('category_id')
		.references(() => categories.id, { onDelete: 'cascade' })
		.notNull(),
	status: dimensionStatus('status').notNull().default('unofficial')
});

export const dimensionsRelations = relations(dimensions, ({ one, many }) => ({
	category: one(categories, {
		fields: [dimensions.categoryId],
		references: [categories.id]
	}),
	dimensionExamples: many(dimensionExamples)
}));

export type NewDimension = InferInsertModel<typeof dimensions>;
export type Dimension = InferSelectModel<typeof dimensions>;
export type PlainDimension = {
	title: string;
	description: string;
};

export type DimensionDetail = Dimension & {
	dimensionExamples: DimensionExampleDetail[];
	category: Category & {
		superCategory: Category;
	};
};
