import { json } from '@sveltejs/kit';
import db from '$lib/db';
import {
	type NewFramework,
	frameworks,
	categories,
	type NewDimension,
	dimensions,
	type NewCategory
} from '$lib/db/schema';

async function uploadNewFramework(
	newFramework: NewFramework,
	newCategories: NewCategory[],
	newDimensions: NewDimension[]
) {
	const frameworkId = await db.transaction(async (tx) => {
		console.log('DB: inserting new framework');
		const insertedFramework = await tx
			.insert(frameworks)
			.values(newFramework)
			.returning({ insertedId: frameworks.id });

		const insertedFrameworkId = insertedFramework[0].insertedId;

		console.log('DB: inserted framework with id', insertedFrameworkId);

		console.log('DB: inserting categories');
		// Stack of categories to insert
		const categoriesToInsert: NewCategory[] = [];
		for (let i = 0; i < newCategories.length; i++) {
			const category = newCategories[i];

			if (category.superCategoryId === 0) {
				categoriesToInsert.push(category);
			}
		}

		// Loop for uploading categories and their dimensions
		while (categoriesToInsert.length > 0) {
			const category = categoriesToInsert.pop();

			if (category) {
				const newCategory: NewCategory = {
					superCategoryId: category.superCategoryId,
					title: category.title,
					description: category.description,
					frameworkId: insertedFrameworkId
				};
				console.log('DB: popping category', newCategory);
				// Insert category
				console.log('DB: inserting category');
				const insertedCategory = await tx
					.insert(categories)
					.values(newCategory)
					.returning({ insertedId: categories.id });

				console.log('DB: inserted category with id', insertedCategory[0].insertedId);

				// Insert subcategories into the stack to be inserted
				const subCategories = newCategories.filter(
					(subCategory) => subCategory.superCategoryId === category.id
				);
				if (subCategories) {
					for (let j = 0; j < subCategories.length; j++) {
						const subcategory = subCategories[j];

						subcategory.superCategoryId = insertedCategory[0].insertedId;
						console.log('DB: stacking subcategory', subcategory);
						categoriesToInsert.push(subcategory);
					}
				}
				console.log('DB: stacked subcategories');

				console.log('DB: inserting dimensions');
				// Insert dimensions
				// They can all be inserted right here,
				// since they are only related to the category we just inserted
				const subDimensions = newDimensions.filter(
					(newDimension) => newDimension.categoryId === category.id
				);

				if (subDimensions) {
					for (let j = 0; j < subDimensions.length; j++) {
						const dimension = subDimensions[j];
						const newDimension: NewDimension = {
							title: dimension.title,
							description: dimension.description,
							categoryId: insertedCategory[0].insertedId
						};
						console.log('DB: inserting dimension', newDimension);
						await tx.insert(dimensions).values(newDimension);
						console.log('DB: inserted dimension');
					}
				}
				console.log('DB: inserted dimensions');
			} else {
				// If pop is undefined, stack is empty, break loop
				break;
			}
		}
		return insertedFrameworkId;
	});

	return frameworkId;
}

export async function POST({ request, cookies }) {
	const { framework, categories, dimensions } = await request.json();
	console.log(framework);
	console.log(categories);
	console.log(dimensions);

	const frameworkId = await uploadNewFramework(framework, categories, dimensions);
	return json({ frameworkId }, { status: 201 });
}
