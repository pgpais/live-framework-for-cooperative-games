import { categories } from './category';
import { relations } from 'drizzle-orm';
import { integer, pgTable, serial } from 'drizzle-orm/pg-core';

export const subCategories = pgTable('sub_categories', {
	id: serial('id')
		.primaryKey()
		.references(() => categories.id)
		.notNull(),
	superCategoryId: integer('super_category_id')
		.references(() => categories.id)
		.notNull()
});

export const subCategoriesRelations = relations(subCategories, ({ one }) => ({
	superCategory: one(categories, {
		fields: [subCategories.superCategoryId],
		references: [categories.id],
		relationName: 'subCategories'
	}),
	category: one(categories, {
		fields: [subCategories.id],
		references: [categories.id],
		relationName: 'category'
	})
}));
