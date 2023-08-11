import { dimensionExamples } from './dimensionExample';
import { frameworks } from './framework';
import { games } from './game';
import { users } from './user';
import { relations, type InferModel } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

export const reports = pgTable('reports', {
	id: serial('id').primaryKey(),
	gameId: integer('game_id')
		.notNull()
		.references(() => games.id),
	frameworkId: integer('framework_id')
		.notNull()
		.references(() => frameworks.id),
	authorId: integer('author_id')
		.notNull()
		.references(() => users.id),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const reportsRelations = relations(reports, ({ one, many }) => ({
	game: one(games, {
		fields: [reports.gameId],
		references: [games.id]
	}),
	framework: one(frameworks, {
		fields: [reports.frameworkId],
		references: [frameworks.id]
	}),
	author: one(users, {
		fields: [reports.authorId],
		references: [users.id]
	}),
	dimensionExamples: many(dimensionExamples)
}));

export type FullReport = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	game: {
		id: number;
		title: string;
		authorId: number;
		createdAt: Date;
		updatedAt: Date;
	};
	framework: {
		id: number;
		title: string;
		authorId: number;
		createdAt: Date;
		updatedAt: Date;
	};
	dimensionExamples: {
		id: number;
		reportId: number;
		dimensionId: number;
		createdAt: Date;
		updatedAt: Date;
	};
};

export type NewReport = InferModel<typeof reports, 'insert'>;

export type ReportDTO = {
	gameId: number;
	frameworkId: number;
	authorId: number;
};

export type ReportWithExamples = {
	id: number;
	gameId: number;
	frameworkId: number;
	authorId: number;
	createdAt: Date;
	updatedAt: Date;
	dimensionExamples: {
		id: number;
		reportId: number;
		dimensionId: number;
		createdAt: Date;
		updatedAt: Date;
	};
};
