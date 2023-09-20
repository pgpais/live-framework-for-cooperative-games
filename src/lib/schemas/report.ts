import type { NewGame } from '$lib/db/schema/game';
import { z } from 'zod';

export const dimensionReportSchema = z.object({
	id: z.number(), //TODO: change to dimensionId. Find out how to map this when fetching from db
	title: z.string(),
	description: z.string(),
	included: z.boolean().optional(),
	example: z.string().nonempty().optional(),
	categoryId: z.number()
});

const baseCategoryReportSchema = z.object({
	id: z.number(),
	frameworkId: z.number(),
	title: z.string(),
	description: z.string(),
	superCategoryId: z.number(),
	dimensions: z.array(dimensionReportSchema).optional()
});

type CategoryReport = z.infer<typeof baseCategoryReportSchema> & {
	subCategories?: CategoryReport[];
};

export const categoryReportSchema: z.ZodType<CategoryReport> = baseCategoryReportSchema.extend({
	subCategories: z.lazy(() => categoryReportSchema.array()).optional()
});

export const gameReportSchema: z.ZodType<NewGame> = z.object({
	id: z.number(),
	name: z.string()
});

export const reportSchema = z.object({
	frameworkId: z.number().default(1),
	game: gameReportSchema,
	categories: z.array(categoryReportSchema).default([]),
	public: z.boolean().optional().default(false)
});

export type ReportSchema = z.infer<typeof reportSchema>;
export type CategoryReportSchema = z.infer<typeof categoryReportSchema>;
export type DimensionReportSchema = z.infer<typeof dimensionReportSchema>;
