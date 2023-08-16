import { z } from 'zod';

export const frameworkEditFormSchema = z.object({
	superCategoryId: z.number().optional(),
	categoryTitle: z.string().optional(),
	dimensionTitle: z.string().optional(),
	description: z.string()
});

export type FrameworkEditFormSchema = z.infer<typeof frameworkEditFormSchema>;
