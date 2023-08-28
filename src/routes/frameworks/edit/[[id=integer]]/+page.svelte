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
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';
	import { z } from 'zod';
	import type { NewCategoryFormSchema } from './+page.server';
	import CategoryView from '$lib/components/CategoryView.svelte';
	import type { FullCategory, FullFramework } from '$lib/db/schema';

	export let data: PageData;

	let { form } = superForm(data.form);
	const { form: categoryForm } = superForm(data.categoryForm);
	const { form: dimensionForm } = superForm(data.dimensionForm);

	let categories = data.categories;
	let framework = data.framework;

	let newCategoriesCount = 0;

	let tabSet: number = 0;

	//Traverse the tree of categories in the framework to find the category with the given id
	function findCategoryByIdInFramework(
		framework: FullFramework,
		categoryId: number,
		categories: FullCategory[] = framework.categories
	): FullCategory | undefined {
		console.log('looking for catgory with id', categoryId);
		console.log('categories', categories);
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

	function addCategory(category: NewCategoryFormSchema) {
		console.log(category);
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
			if (!superCategory) throw new Error('Super category not found');
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

		console.log('framework', framework);
		console.log('categories', categories);
	}
</script>

<ThreeColumnLayout>
	<svelte:fragment slot="left">
		<SuperDebug data={$categoryForm} />
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
					<form
						class="text-token space-y-4 p-4"
						on:submit|preventDefault={() => addCategory($categoryForm)}
					>
						<label class="label">
							<span>Parent Category</span>
							<select class="select" bind:value={$categoryForm.superCategoryId}>
								<option value={0}>No parent category</option>
								{#each categories as category}
									<option value={category.id}>{category.title}</option>
								{/each}
							</select>
						</label>
						<label class="label">
							<span>Title of new category</span>
							<input
								class="input"
								type="text"
								bind:value={$categoryForm.title}
								placeholder="Insert the category name"
							/>
						</label>
						<label class="label">
							<span>Description of new category</span>
							<textarea
								class="textarea"
								bind:value={$categoryForm.description}
								placeholder="Insert the category description"
							/>
						</label>
						<div>
							<button class="btn variant-filled-primary"> Add New Category </button>
						</div>
					</form>
				{:else if tabSet === 1}
					<!-- Adding a new Dimension -->
					(tab panel 2 contents)
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</ThreeColumnLayout>
