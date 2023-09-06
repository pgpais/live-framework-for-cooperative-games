import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { FullCategory } from '$lib/db/schema';

export const GET: RequestHandler = async ({ params }) => {
	const categoryId = params.id ? +params.id : 1;

	console.log('fetching category with ID', categoryId);

	const category: FullCategory | undefined = await db.query.categories.findFirst({
		with: {
			dimensions: true,
			superCategory: true,
			subCategories: true
		},
		where: (categories, { eq }) => eq(categories.id, categoryId)
	});

	return json(category);
};
