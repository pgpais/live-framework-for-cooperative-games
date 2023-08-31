import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { pgTable, text, serial, timestamp, varchar, bigint } from 'drizzle-orm/pg-core';

export const users = pgTable('auth_user', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	fullName: text('full_name').notNull(),
	email: text('email').unique().notNull(),
	password: text('password').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const sessions = pgTable('user_session', {
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

export const keys = pgTable('user_key', {
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

export type User = InferSelectModel<typeof users>; // return type when queried
export type NewUser = InferInsertModel<typeof users>; // insert type
