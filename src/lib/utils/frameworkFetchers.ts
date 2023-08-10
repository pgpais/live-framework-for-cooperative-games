import db from '$lib/db';
import {
	frameworks,
	type FirstLevelFramework,
	type FullCategory,
	type FullFramework
} from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

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

export async function GetFullFrameworkByAuthor(authorId: number) {
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
	if (framework) {
		const fullFramework = makeFullFramework(framework);
		return fullFramework;
	} else {
		throw error(404, 'Framework not found');
	}
}

export async function GetFullFrameworkById(frameworkId: number) {
	const framework: FirstLevelFramework | undefined = await db.query.frameworks.findFirst({
		where: eq(frameworks.id, frameworkId),
		with: {
			author: true,
			categories: {
				with: {
					dimensions: true
				}
			}
		}
	});
	if (framework) {
		const fullFramework = makeFullFramework(framework);
		return fullFramework;
	} else {
		throw error(404, 'Framework not found');
	}
}
