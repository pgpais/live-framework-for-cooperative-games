import { z } from 'zod';

export const dimensionReportSchema = z.object({
	id: z.number(), //TODO: change to dimensionId. Find out how to map this when fetching from db
	title: z.string(),
	description: z.string(),
	included: z.boolean().optional(),
	example: z.string().optional(),
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
	dimensions: z.array(dimensionReportSchema).optional(),
	status: z.enum(['unofficial', 'merged', 'declined', 'official']).default('unofficial').optional()
});

type CategoryReport = z.infer<typeof baseCategoryReportSchema> & {
	subCategories?: CategoryReport[];
};

export const categoryReportSchema: z.ZodType<CategoryReport> = baseCategoryReportSchema.extend({
	subCategories: z.lazy(() => categoryReportSchema.array()).optional()
});

export const reportSchema = z
	.object({
		frameworkId: z.number().default(1),
		authorId: z.string().default(''),
		gameId: z.number(),
		gameMode: z
			.enum(['coopCampaign', 'competitiveTeamPlay', 'coopScenarios', 'other'])
			.default('coopCampaign'),
		gameModeOther: z.string().optional(),
		analysisLevel: z.enum(['macro', 'micro', 'other']).default('macro'),
		analysisLevelOther: z.string().optional(),
		valueIdentification: z.enum(['all', 'relevant', 'other']).default('all'),
		valueIdentificationOther: z.string().optional(),
		goal: z.string().optional(),
		categories: z.array(categoryReportSchema).default([]),
		analysisType: z.enum(['played', 'pastPlayed', 'observations', 'other']).default('played'),
		otherAnalysisType: z.string().optional(),
		analysisDescription: z.string().optional(),
		frameworkDifficulty: z.number().default(3),
		frameworkComments: z.string().optional(),
		public: z.boolean().optional().default(true)
	})
	.refine((data) => {
		// At least one dimension of any category must be included
		let categoryValidated = false;
		for (const category of data.categories) {
			categoryValidated = validateCategory(category);
			if (categoryValidated) break;
		}
		return categoryValidated;
	}, 'At least one dimension of any category must be included');

export type ReportSchema = z.infer<typeof reportSchema>;
export type CategoryReportSchema = z.infer<typeof categoryReportSchema>;
export type DimensionReportSchema = z.infer<typeof dimensionReportSchema>;

function validateCategory(category: CategoryReport): boolean {
	let categoryValidated = false;
	if (category.dimensions) {
		console.log('category.dimensions', category.dimensions);
		for (const dimension of category.dimensions) {
			if (dimension.included) {
				categoryValidated = true;
				break;
			}
		}
	}

	if (!categoryValidated) {
		if (category.subCategories && category.subCategories.length > 0) {
			for (const subCategory of category.subCategories) {
				categoryValidated = validateCategory(subCategory);
				if (categoryValidated) break;
			}
		}
	}

	return categoryValidated;
}
