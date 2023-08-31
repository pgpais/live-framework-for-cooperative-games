import { categories } from './category';
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
		.references(() => categories.id)
		.notNull(),
	status: dimensionStatus('status').notNull().default('unofficial')
});

export const dimensionsRelations = relations(dimensions, ({ one }) => ({
	category: one(categories, {
		fields: [dimensions.categoryId],
		references: [categories.id]
	})
}));

export type NewDimension = InferInsertModel<typeof dimensions>;
export type Dimension = InferSelectModel<typeof dimensions>;
export type PlainDimension = {
	title: string;
	description: string;
};
