import db from '$lib/db';
import {
	frameworks,
	type FirstLevelFramework,
	type FullCategory,
	type FullFramework,
	type CategoryWithDimensions,
	categories,
	type Category
} from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

// TODO: simplify with zod (?)
// populate subcategories of categories in framework in a new function
const makeFullFramework = (framework: FirstLevelFramework) => {
	const categories = framework.categories;

	const fullCategories = makeFullCategories(categories);

	const fullFramework: FullFramework = { ...framework, categories: fullCategories };
	fullFramework.categories = fullCategories;
	return fullFramework;
};

//TODO: this can probably be improved by calling makeFullCategories with superCategoryId = 0
const makeFullCategories = (categories: CategoryWithDimensions[]) => {
	const fullCategories: FullCategory[] = categories
		.filter((c) => c.superCategoryId === 0)
		.map((c) => {
			const fullCategory: FullCategory = {
				...c
			};
			fullCategory.subCategories = makeFullSubCategories(categories, fullCategory);
			return fullCategory;
		});
	return fullCategories;
};

const makeFullSubCategories = (
	categories: CategoryWithDimensions[],
	superCategory: FullCategory
) => {
	const subCategories = categories
		.filter((c) => c.superCategoryId === superCategory.id)
		.map((c) => {
			const fullSubcategory: FullCategory = {
				...c
			};
			fullSubcategory.subCategories = makeFullSubCategories(categories, fullSubcategory);
			return fullSubcategory;
		});
	return subCategories;
};

export async function GetCategoriesByFrameworkId(frameworkId: number) {
	const fetchedCategories: Category[] = await db.query.categories.findMany({
		where: eq(categories.frameworkId, frameworkId)
	});
	return fetchedCategories;
}

export async function GetCategoriesWithDimensionsByFrameworkId(frameworkId: number) {
	const fetchedCategories: CategoryWithDimensions[] = await db.query.categories.findMany({
		where: eq(categories.frameworkId, frameworkId),
		with: {
			dimensions: true,
			subCategories: true
		}
	});
	return fetchedCategories;
}

export async function GetFullCategoriesByFrameworkId(frameworkId: number) {
	const fetchedCategories = await GetCategoriesWithDimensionsByFrameworkId(frameworkId);
	const fullCategories = makeFullCategories(fetchedCategories);
	return fullCategories;
}

export async function GetFullFrameworkByAuthor(authorId: number) {
	const framework: FirstLevelFramework | undefined = await db.query.frameworks.findFirst({
		where: eq(frameworks.authorId, authorId),
		with: {
			author: true,
			categories: {
				with: {
					dimensions: true,
					subCategories: true
				}
			}
		}
	});
	if (framework) {
		const fullFramework = makeFullFramework(framework);
		return fullFramework;
		// return framework;
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
		// return framework;
	} else {
		throw error(404, 'Framework not found');
	}
}
