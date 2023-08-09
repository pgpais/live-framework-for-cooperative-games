import { dimensions, type Dimension } from './dimension';
import { frameworks } from './framework';
import { relations, type InferModel } from 'drizzle-orm';
import { pgTable, text, integer, serial } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	frameworkId: integer('framework_id')
		.references(() => frameworks.id)
		.notNull(),
	superCategoryId: integer('super_category_id')
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
	framework: one(frameworks, {
		fields: [categories.frameworkId],
		references: [frameworks.id]
	}),
	dimensions: many(dimensions),
	subCategories: many(categories, {
		relationName: 'subCategories'
	}),
	superCategory: one(categories, {
		relationName: 'subCategories',
		fields: [categories.superCategoryId],
		references: [categories.id]
	})
	/*subCategories: many(subCategories, {
		relationName: 'subCategories'
	}),
	supercategory: one(subCategories, {
		relationName: 'supercategory',
		fields: [categories.id],
		references: [subCategories.id]
	})*/
}));

export type Category = InferModel<typeof categories>;

export type CategoryWithSubCategories = Category & {
	subCategories: Category[];
};

export type CategoryWithMaybeEverything = Category &
	Partial<{
		superCategory: Category;
		subCategories: Category[];
	}>;

export type CategoryWithDimensions = Category & {
	dimensions: Dimension[];
};

export type FullCategory = Category & {
	dimensions: Dimension[];
	subCategories?: FullCategory[];
	superCategory: Category;
};
