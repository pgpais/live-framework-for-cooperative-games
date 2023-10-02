import { z } from 'zod';

export const dimensionReportSchema = z.object({
	id: z.number(), //TODO: change to dimensionId. Find out how to map this when fetching from db
	title: z.string(),
	description: z.string(),
	included: z.boolean().optional(),
	example: z.string().nonempty().optional(),
	categoryId: z.number(),
	status: z.enum(['unofficial', 'merged', 'declined', 'official']),
	imageURL: z.string().optional()
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

export const reportSchema = z.object({
	frameworkId: z.number().default(1),
	authorId: z.string().default(''),
	gameId: z.number(),
	categories: z.array(categoryReportSchema).default([]),
	analysisType: z.enum(['played', 'pastPlayed', 'observations', 'other']).default('played'),
	otherAnalysisType: z.string().optional(),
	analysisDescription: z.string().optional(),
	frameworkDifficulty: z.number().default(3),
	frameworkComments: z.string().optional(),
	public: z.boolean().optional().default(true)
});

export type ReportSchema = z.infer<typeof reportSchema>;
export type CategoryReportSchema = z.infer<typeof categoryReportSchema>;
export type DimensionReportSchema = z.infer<typeof dimensionReportSchema>;
