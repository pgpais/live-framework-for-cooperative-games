import db from '$db';
import {
	frameworks,
	type FirstLevelFramework,
	type FullCategory,
	type FullFramework
} from '$db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// populate subcategories of categories in framework in a new function
const makeFullFramework = (framework: FirstLevelFramework) => {
	const categories = framework.categories;
	const fullCategories: FullCategory[] = [];
	for (let i = 0; i < categories.length; i++) {
		const category = categories[i];
		const subCategories: FullCategory[] = categories.filter(
			(c) => c.superCategoryId === category.id
		) as FullCategory[];

		const fullCategory = category as FullCategory;
		fullCategory.subCategories = subCategories;
		fullCategories.push(fullCategory);
	}

	const fullFramework: FullFramework = framework as FullFramework;
	fullFramework.categories = fullCategories;
	console.log(fullFramework);
	return fullFramework;
};

export const load = (async ({ params }) => {
	const authorId: number = params.author ? +params.author : 1;
	const framework: FirstLevelFramework | undefined = await db.query.frameworks.findFirst({
		where: eq(frameworks.authorId, authorId),
		with: {
			author: true,
			categories: {
				with: {
					dimensions: true
				}
			}
		}
	});
	// console.log(framework);
	if (framework) {
		const fullFramework = makeFullFramework(framework);
		return { framework: fullFramework };
	} else {
		throw error(404, 'Framework not found');
	}
}) satisfies PageServerLoad;
