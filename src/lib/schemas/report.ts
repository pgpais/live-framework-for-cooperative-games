import { z } from 'zod';

export const dimensionReportSchema = z.object({
	id: z.number(), //TODO: change to dimensionId. Find out how to map this when fetching from db
	title: z.string(),
	included: z.boolean().optional(),
	example: z.string().nonempty().optional()
});

const baseCategoryReportSchema = z.object({
	id: z.number(),
	title: z.string(),
	superCategoryId: z.number(),
	dimensions: z.array(dimensionReportSchema)
});

type CategoryReport = z.infer<typeof baseCategoryReportSchema> & {
	subCategories?: CategoryReport[];
};

export const categoryReportSchema: z.ZodType<CategoryReport> = baseCategoryReportSchema.extend({
	subCategories: z.lazy(() => categoryReportSchema.array()).optional()
});

export const reportSchema = z.object({
	frameworkId: z.number().default(1),
	categories: z.array(categoryReportSchema).default([])
});

export type ReportSchema = z.infer<typeof reportSchema>;
export type CategoryReportSchema = z.infer<typeof categoryReportSchema>;
export type DimensionReportSchema = z.infer<typeof dimensionReportSchema>;
