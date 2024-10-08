import { dimensions, type Dimension, type PlainDimension } from './dimension';
import { frameworks } from './framework';
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, integer, serial, pgEnum } from 'drizzle-orm/pg-core';

export const categoryStatus = pgEnum('categories_status', [
	'unofficial',
	'merged',
	'declined',
	'official'
]);

export const categories = pgTable('categories', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	frameworkId: integer('framework_id')
		.references(() => frameworks.id, { onDelete: 'cascade' })
		.notNull(),
	superCategoryId: integer('super_category_id').notNull().default(0),
	siblingCategoryId: integer('sibling_category_id').notNull().default(0),
	status: categoryStatus('status').notNull().default('unofficial')
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
	}),
	siblingCategory: one(categories, {
		relationName: 'siblingCategory',
		fields: [categories.siblingCategoryId],
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

export type NewCategory = InferInsertModel<typeof categories>;

export type Category = InferSelectModel<typeof categories>;

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
	dimensions?: Dimension[];
	subCategories?: FullCategory[];
	superCategory?: FullCategory;
};

export type PlainCategory = {
	title: string;
	description: string;
	dimensions?: PlainDimension[];
	subCategories?: PlainCategory[];
};
