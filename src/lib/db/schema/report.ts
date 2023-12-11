import { dimensionExamples, type DimensionExample } from './dimensionExample';
import { frameworks, type Framework } from './framework';
import { games, type Game } from './game';
import { users } from './user';
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	serial,
	smallint,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';

export const analysisType = pgEnum('analysis_type', [
	'played',
	'pastPlayed',
	'observations',
	'other'
]);

export const gameMode = pgEnum('game_mode', [
	'coopCampaign',
	'competitiveTeamPlay',
	'coopScenarios',
	'other'
]);

export const analysisLevel = pgEnum('analysis_level', ['macro', 'micro', 'other']);

export const valueIdentification = pgEnum('value_identification', ['all', 'relevant', 'other']);

export const reports = pgTable('reports', {
	id: serial('id').primaryKey(),
	gameId: integer('game_id')
		.notNull()
		.references(() => games.id),
	frameworkId: integer('framework_id')
		.notNull()
		.references(() => frameworks.id),
	authorId: varchar('author_id')
		.notNull()
		.references(() => users.id),
	gameMode: gameMode('game_mode').notNull().default('coopCampaign'),
	gameModeOther: text('game_mode_other'),
	analysisLevel: analysisLevel('analysis_level').notNull().default('macro'),
	analysisLevelOther: text('analysis_level_other'),
	valueIdentification: valueIdentification('value_identification').notNull().default('all'),
	valueIdentificationOther: text('value_identification_other'),
	analysisType: analysisType('analysis_type').notNull().default('played'),
	otherAnalysisType: text('other_analysis_type'),
	analysisDescription: text('analysis_description'),
	frameworkDifficulty: smallint('framework_difficulty').notNull().default(3),
	frameworkComments: text('framework_comments'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
	public: boolean('public').notNull().default(true)
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
	game: Game;
	framework: Framework;
	dimensionExamples: DimensionExample[];
};

export type Report = InferSelectModel<typeof reports>;
export type NewReport = InferInsertModel<typeof reports>;

export type ReportWithGames = Report & {
	game: Game;
};
