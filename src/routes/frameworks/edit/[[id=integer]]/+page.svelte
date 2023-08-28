<script lang="ts">
	import type { PageData } from './$types';
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import { Edit } from 'lucide-svelte';
	import {
		modalStore,
		type ModalComponent,
		type ModalSettings,
		TabGroup,
		Tab
	} from '@skeletonlabs/skeleton';
	import FrameworkEditModal from '$lib/components/FrameworkEditModal.svelte';
	import { superForm, superValidate } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';
	import { z } from 'zod';
	import type { NewCategoryFormSchema, NewDimensionFormSchema } from './+page.server';
	import CategoryView from '$lib/components/CategoryView.svelte';
	import type { FullCategory, FullFramework } from '$lib/db/schema';
	import { enhance } from '$app/forms';
	import { fail } from '@sveltejs/kit';

	export let data: PageData;

	let { form } = superForm(data.form);
	const {
		form: categoryForm,
		errors: categoryFormErrors,
		validate: validateCategoryForm
	} = superForm(data.categoryForm, {
		validators: {
			superCategoryId: (superCategoryId) => {
				if (superCategoryId === 0) {
					console.log('You must select a category');
					return 'You must select a category';
				}
				if (!data.categories.find((category) => category.id === superCategoryId)) {
					console.log('Category not found');
					return 'Category not found';
				}
				return undefined;
			},
			title: (title) => {
				if (!title || title.length <= 0) {
					console.log('Title must not be empty');
					return 'Title must not be empty';
				}
				return undefined;
			},
			description: (description) => {
				if (!description || description.length <= 0) {
					console.log('Description must not be empty');
					return 'Description must not be empty';
				}
				return undefined;
			}
		}
	});
	const {
		form: dimensionForm,
		errors: dimensionFormErrors,
		validate: validateDimensionForm
	} = superForm(data.dimensionForm, {
		validators: {
			categoryId: (categoryId) => {
				if (categoryId === 0) {
					console.log('You must select a category');
					return 'You must select a category';
				}
				if (!data.categories.find((category) => category.id === categoryId)) {
					console.log('Category not found');
					return 'Category not found';
				}
				return undefined;
			},
			title: (title) => {
				if (!title || title.length <= 0) {
					console.log('Title must not be empty');
					return 'Title must not be empty';
				}
				return undefined;
			},
			description: (description) => {
				if (!description || description.length <= 0) {
					console.log('Description must not be empty');
					return 'Description must not be empty';
				}
				return undefined;
			}
		}
	});

	let categories = data.categories;
	let framework = data.framework;

	let newCategoriesCount = 0;
	let newDimensionsCount = 0;

	let tabSet: number = 0;

	//Traverse the tree of categories in the framework to find the category with the given id
	function findCategoryByIdInFramework(
		framework: FullFramework,
		categoryId: number,
		categories: FullCategory[] = framework.categories
	): FullCategory | undefined {
		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];
			if (category.id === categoryId) return category;

			if (category.subCategories && category.subCategories.length > 0) {
				const subCategory = findCategoryByIdInFramework(
					framework,
					categoryId,
					category.subCategories
				);
				if (subCategory) return subCategory;
			}
		}
		return undefined;
	}

	const newDimensionFormSchema = z.object({
		categoryId: z.number(),
		title: z.string(),
		description: z.string()
	});

	async function addDimension() {
		const result = await validateDimensionForm();
		if (result.valid) {
			const dimension = result.data;

			console.log(dimension);
			const category = findCategoryByIdInFramework(
				framework,
				dimension.categoryId,
				framework.categories
			);
			if (!category) throw new Error('Category not found');
			newDimensionsCount++;
			category.dimensions?.push({
				id: -newDimensionsCount,
				title: dimension.title,
				description: dimension.description,
				categoryId: dimension.categoryId
			});
		} else {
			console.log('Form is not valid', result);
		}
		framework = framework;
		categories = categories;
		$dimensionFormErrors = result.errors;
	}

	async function addCategory() {
		const result = await validateCategoryForm();
		if (result.valid) {
			const category = result.data;

			newCategoriesCount++;

			if (category.superCategoryId == 0) {
				framework.categories.push({
					frameworkId: -1,
					id: -newCategoriesCount,
					title: category.title,
					description: category.description,
					dimensions: [],
					subCategories: [],
					superCategoryId: category.superCategoryId
				});
			} else {
				const superCategory = findCategoryByIdInFramework(
					framework,
					category.superCategoryId,
					framework.categories
				);
				if (!superCategory) return fail(404, { message: 'Super category not found' });
				superCategory.subCategories?.push({
					frameworkId: -1,
					id: -newCategoriesCount,
					title: category.title,
					description: category.description,
					superCategory,
					dimensions: [],
					subCategories: [],
					superCategoryId: category.superCategoryId
				});
			}

			data.categories.push({
				frameworkId: -1,
				id: -newCategoriesCount,
				title: category.title,
				description: category.description,
				superCategoryId: category.superCategoryId
			});
			framework = framework;
			categories = categories;
		} else {
			console.log('Form is not valid', result);
		}
		$categoryFormErrors = result.errors;
	}
</script>

<ThreeColumnLayout>
	<svelte:fragment slot="left">
		<SuperDebug data={$categoryForm} />
		<SuperDebug data={$dimensionForm} />
	</svelte:fragment>
	<div class="m-6">
		<FrameworkView {framework} />
	</div>
	<div slot="right">
		<TabGroup>
			<Tab bind:group={tabSet} name="addCategory" value={0}>New Category</Tab>
			<Tab bind:group={tabSet} name="addDimension" value={1}>New Dimension</Tab>
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<!-- Adding a new Category -->
					<form class="text-token space-y-4 p-4" on:submit|preventDefault={addCategory}>
						<label class="label">
							<span>Parent Category</span>
							<select class="select" bind:value={$categoryForm.superCategoryId}>
								<option value={0}>No parent category</option>
								{#each categories as category}
									<option value={category.id}>{category.title}</option>
								{/each}
							</select>
							{#if $categoryFormErrors.superCategoryId}
								<span class="text-error-500-400-token">{$categoryFormErrors.superCategoryId}</span>
							{/if}
						</label>
						<label class="label">
							<span>Title of new category</span>
							<input
								class="input"
								type="text"
								bind:value={$categoryForm.title}
								placeholder="Insert the category name"
							/>
							{#if $categoryFormErrors.title}
								<span class="text-error-500-400-token">{$categoryFormErrors.title}</span>
							{/if}
						</label>
						<label class="label">
							<span>Description of new category</span>
							<textarea
								class="textarea"
								bind:value={$categoryForm.description}
								placeholder="Insert the category description"
							/>
							{#if $categoryFormErrors.description}
								<span class="text-error-500-400-token">{$categoryFormErrors.description}</span>
							{/if}
						</label>
						<div>
							<button class="btn variant-filled-primary"> Add New Category </button>
						</div>
					</form>
				{:else if tabSet === 1}
					<!-- Adding a new Dimension -->
					<form class="text-token space-y-4 p-4" on:submit|preventDefault={addDimension}>
						<label class="label">
							<span>Parent Category</span>
							<select
								name="categoryId"
								class="select"
								bind:value={$dimensionForm.categoryId}
								aria-invalid={$dimensionFormErrors.categoryId ? 'true' : undefined}
							>
								<option value={0}>No parent category</option>
								{#each categories as category}
									<option value={category.id}>{category.title}</option>
								{/each}
							</select>
							{#if $dimensionFormErrors.categoryId}
								<span class="text-error-500-400-token">{$dimensionFormErrors.categoryId}</span>
							{/if}
						</label>
						<label class="label">
							<span>Title of new dimension</span>
							<input
								class="input"
								type="text"
								bind:value={$dimensionForm.title}
								placeholder="Insert the category name"
							/>
							{#if $dimensionFormErrors.title}
								<span class="text-error-500-400-token">{$dimensionFormErrors.title}</span>
							{/if}
						</label>
						<label class="label">
							<span>Description of new dimension</span>
							<textarea
								class="textarea"
								bind:value={$dimensionForm.description}
								placeholder="Insert the category description"
							/>
							{#if $dimensionFormErrors.description}
								<span class="text-error-500-400-token">{$dimensionFormErrors.description}</span>
							{/if}
						</label>
						<div>
							<button class="btn variant-filled-primary"> Add New Dimension </button>
						</div>
					</form>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</ThreeColumnLayout>
