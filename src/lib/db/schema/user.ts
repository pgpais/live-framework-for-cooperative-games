import { bigint, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { frameworks } from './framework';
import { type InferSelectModel, type InferInsertModel, relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	fullName: text('full_name'),
	email: text('email').unique(),
	username: text('username').notNull().unique(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const session = pgTable('user_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const key = pgTable('user_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	hashedPassword: varchar('hashed_password', {
		length: 255
	})
});

export const userRelations = relations(users, ({ one, many }) => ({
	frameworks: many(frameworks)
}));

export type User = InferSelectModel<typeof users>; // return type when queried
export type NewUser = InferInsertModel<typeof users>; // insert type
