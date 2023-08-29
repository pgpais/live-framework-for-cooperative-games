import { users, type User } from './user';
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, integer, timestamp, serial } from 'drizzle-orm/pg-core';
import {
	categories,
	type Category,
	type CategoryWithDimensions,
	type CategoryWithSubCategories,
	type FullCategory
} from './category';

export const frameworks = pgTable('frameworks', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	authorId: integer('author_id')
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const frameworksRelations = relations(frameworks, ({ one, many }) => ({
	author: one(users, {
		fields: [frameworks.authorId],
		references: [users.id]
	}),
	categories: many(categories)
}));

export type Framework = InferSelectModel<typeof frameworks>;

export type NewFramework = InferInsertModel<typeof frameworks>;

export type FrameworkAuthor = Framework & {
	author: User;
};

export type FrameworkCategories = Framework & {
	categories: Category[];
};

export type FrameworkAuthorCategories = Framework & {
	author: User;
	categories: CategoryWithSubCategories[];
};

export type FirstLevelFramework = Framework & {
	author: User;
	categories: CategoryWithDimensions[];
};

export type FullFramework = Framework & {
	author: User;
	categories: FullCategory[];
};
