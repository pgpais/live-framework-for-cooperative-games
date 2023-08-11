import { categories } from './category';
import { relations, type InferModel } from 'drizzle-orm';
import { pgTable, text, integer, serial } from 'drizzle-orm/pg-core';

export const dimensions = pgTable('dimensions', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	categoryId: integer('category_id')
		.references(() => categories.id)
		.notNull()
});

export const dimensionsRelations = relations(dimensions, ({ one }) => ({
	category: one(categories, {
		fields: [dimensions.categoryId],
		references: [categories.id]
	})
}));

export type Dimension = InferModel<typeof dimensions>;
