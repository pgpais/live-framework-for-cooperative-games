import {
	GetCategoriesByFrameworkId,
	GetFullCategoriesByFrameworkId,
	GetFullFrameworkById
} from '$lib/utils/frameworkFetchers';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { frameworkEditFormSchema } from '$lib/schemas/frameworkEdit';
import { z } from 'zod';
import db from '$lib/db';
import { eq } from 'drizzle-orm';
import { categories, dimensions } from '$lib/db/schema';

const newCategoryFormSchema = z.object({
	superCategoryId: z.number().default(0),
	title: z.string(),
	description: z.string()
});

export type NewCategoryFormSchema = z.infer<typeof newCategoryFormSchema>;

const newDimensionFormSchema = z.object({
	categoryId: z.number(),
	title: z.string(),
	description: z.string()
});

export type NewDimensionFormSchema = z.infer<typeof newDimensionFormSchema>;

export const load = (async ({ params }) => {
	const framework = await GetFullFrameworkById(params.id ? +params.id : 1);
	const categories = await GetCategoriesByFrameworkId(framework.id);

	const form = await superValidate(frameworkEditFormSchema);
	const categoryForm = await superValidate(newCategoryFormSchema);
	const dimensionForm = await superValidate(newDimensionFormSchema);

	return {
		framework,
		form,
		categoryForm,
		dimensionForm,
		categories
	};
}) satisfies PageServerLoad;
