<script lang="ts">
	import type { PageData } from './$types';
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import { TabGroup, Tab, Stepper, Step, getToastStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';
	import type {
		Dimension,
		FullCategory,
		FullFramework,
		NewCategory,
		NewDimension,
		NewFramework
	} from '$lib/db/schema';
	import { fail } from '@sveltejs/kit';
	import DetailView from '$lib/components/DetailView.svelte';
	import { Loader } from 'lucide-svelte';
	import type { StepperState } from '@skeletonlabs/skeleton/dist/components/Stepper/types';

	const toastStore = getToastStore();

	export let data: PageData;

	let { form } = superForm(data.form);
	const {
		form: categoryForm,
		errors: categoryFormErrors,
		validate: validateCategoryForm
	} = superForm(data.categoryForm, {
		validators: {
			superCategoryId: (superCategoryId) => {
				if (
					superCategoryId > 0 &&
					!categories.find((category) => category.id === superCategoryId)
				) {
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
				if (!categories.find((category) => category.id === categoryId)) {
					console.log('Category not found');
					console.log('framework', framework);
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
	framework.title = '';
	framework.description = '';

	let newCategoriesCount = 0;
	let newDimensionsCount = 0;

	let tabSet: number = 0;
	let stepperStep: number = 0;
	let submittingFramework = false;

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

	async function addDimension() {
		const result = await validateDimensionForm();
		if (result.valid) {
			const dimension = result.data;

			console.log(dimension);
			const categoryInFramework = findCategoryByIdInFramework(
				framework,
				dimension.categoryId,
				framework.categories
			);
			if (!categoryInFramework) throw new Error('Category not found');
			newDimensionsCount++;
			categoryInFramework.dimensions?.push({
				id: -newDimensionsCount,
				title: dimension.title,
				description: dimension.description,
				categoryId: dimension.categoryId,
				status: 'unofficial'
			});
			const category = categories.find((c) => c.id === dimension.categoryId);
			if (!category) throw new Error('Category not found');
			category.dimensions?.push({
				id: -newDimensionsCount,
				title: dimension.title,
				description: dimension.description,
				categoryId: dimension.categoryId,
				status: 'unofficial'
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
					superCategoryId: category.superCategoryId,
					siblingCategoryId: 0,
					status: 'unofficial'
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
					superCategoryId: category.superCategoryId,
					siblingCategoryId: 0,
					status: 'unofficial'
				});
			}

			categories.push({
				frameworkId: -1,
				id: -newCategoriesCount,
				title: category.title,
				description: category.description,
				superCategoryId: category.superCategoryId,
				siblingCategoryId: 0,
				dimensions: [],
				status: 'unofficial'
			});
			framework = framework;
			categories = categories;
		} else {
			console.log('Form is not valid', result);
		}
		$categoryFormErrors = result.errors;
	}

	function removeDimension(dimension: Dimension) {
		const category = findCategoryByIdInFramework(
			framework,
			dimension.categoryId,
			framework.categories
		);
		if (!category) throw new Error('Category not found');
		category.dimensions = category.dimensions?.filter((d) => d.id !== dimension.id);
		framework = framework;
		categories = categories;
	}

	function removeCategory(categoryToDelete: FullCategory) {
		const category = categories.find((c) => c.id === categoryToDelete.id);
		if (!category) throw new Error('Category not found');

		const subCategories = categories.filter((c) => c.superCategoryId === category.id);

		if (subCategories) {
			for (let i = 0; i < subCategories.length; i++) {
				const subCategory = subCategories[i];
				removeCategory(subCategory);
			}
		}

		if (category.superCategoryId == 0) {
			framework.categories = framework.categories.filter((c) => c.id !== category.id);
		} else {
			const superCategory = findCategoryByIdInFramework(
				framework,
				category.superCategoryId,
				framework.categories
			);
			if (!superCategory) throw new Error('Cannot remove category, Super category not found');
			superCategory.subCategories = superCategory.subCategories?.filter(
				(c) => c.id !== category.id
			);
		}

		categories = categories.filter((c) => c.id !== category.id);
		framework = framework;
		categories = categories;
	}

	async function addFramework() {
		console.log('Add Framework');
		submittingFramework = true;
		const newFramework: NewFramework = {
			title: framework.title,
			authorId: framework.authorId,
			description: framework.description
		};
		console.log(JSON.stringify(newFramework));

		const newCategories: NewCategory[] = categories.map((category) => {
			const newCategory: NewCategory = {
				id: category.id,
				title: category.title,
				description: category.description,
				superCategoryId: category.superCategoryId,
				siblingCategoryId: category.siblingCategoryId != 0 ? category.id : 0,
				frameworkId: -1,
				status: category.status
			};
			return newCategory;
		});

		const newDimensions: NewDimension[] = [];
		categories.forEach((category) => {
			category.dimensions?.forEach((dimension) => {
				newDimensions.push({
					title: dimension.title,
					description: dimension.description,
					categoryId: dimension.categoryId,
					status: dimension.status
				});
			});
		});
		console.log(JSON.stringify(newCategories));
		console.log(JSON.stringify(newDimensions));
		const response = await fetch('/api/frameworks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				framework: newFramework,
				categories: newCategories,
				dimensions: newDimensions
			})
		});
		const responsejson = await response.json();
		console.log(responsejson);
		if (response.status === 201) {
			toastStore.trigger({ message: 'Framework submitted successfully' });
			window.location.href = '/frameworks/' + responsejson.frameworkId;
		} else {
			submittingFramework = false;
			console.log('Error submitting framework: ', responsejson.message ?? 'Unknown error');
			toastStore.trigger({
				message: 'Error submitting framework: ' + responsejson.message ?? 'Unknown error'
			});
		}
	}

	function OnStep(e: CustomEvent<{ step: number; state: StepperState }>) {
		console.log('event:step', e);
		stepperStep = e.detail.state.current;
	}
</script>

<ThreeColumnLayout>
	<!-- <svelte:fragment slot="left">
		<SuperDebug data={$categoryForm} />
		<SuperDebug data={$dimensionForm} />
	</svelte:fragment> -->
	<Stepper
		on:step={OnStep}
		on:complete={addFramework}
		buttonCompleteLabel={'Submit'}
		class="m-5 rounded-2xl bg-tertiary-800 p-5"
	>
		<Step>
			<header slot="header">Fill some information about your framework</header>
			<input
				class="input"
				type="text"
				bind:value={framework.title}
				placeholder="Insert the framework name"
			/>
			<input
				class="input"
				type="text"
				bind:value={framework.description}
				placeholder="Insert the framework description"
			/>
			<!-- TODO: Add tooltip with a help for description -->
		</Step>
		<Step locked={submittingFramework}>
			<FrameworkView
				{framework}
				editable={true}
				onCategoryRemove={removeCategory}
				onDimensionRemove={removeDimension}
			/>
			<div class="flex">
				<!-- <button
						class="btn variant-filled-primary"
						on:click={addFramework}
						disabled={addingFramework}
					>
						Save Framework
					</button> -->
				{#if submittingFramework}
					<Loader class="animate-spin" />
				{/if}
			</div>
		</Step>
	</Stepper>
	<div slot="right">
		<!-- TODO: Abstract into a component so you can use it in detail drawer -->
		<TabGroup>
			<Tab bind:group={tabSet} name="detail" value={0}>Detail</Tab>
			{#if stepperStep == 1}
				<Tab bind:group={tabSet} name="addCategory" value={1}>New Category</Tab>
				<Tab bind:group={tabSet} name="addDimension" value={2}>New Value</Tab>
			{/if}
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="mx-4">
						<DetailView />
					</div>
				{:else if tabSet === 1}
					<!-- Adding a new Category -->
					<form class="text-token mx-4 space-y-4 p-4" on:submit|preventDefault={addCategory}>
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
							<button class="variant-filled-primary btn"> Add New Category </button>
						</div>
					</form>
				{:else if tabSet === 2}
					<!-- Adding a new Dimension -->
					<form class="text-token mx-4 space-y-4 p-4" on:submit|preventDefault={addDimension}>
						<label class="label">
							<span>Parent Category</span>
							<select
								name="categoryId"
								class="select"
								bind:value={$dimensionForm.categoryId}
								aria-invalid={$dimensionFormErrors.categoryId ? 'true' : undefined}
							>
								<!-- <option value={0}>No parent category</option> -->
								{#each categories as category}
									<option value={category.id}>{category.title}</option>
								{/each}
							</select>
							{#if $dimensionFormErrors.categoryId}
								<span class="text-error-500-400-token">{$dimensionFormErrors.categoryId}</span>
							{/if}
						</label>
						<label class="label">
							<span>Title of new value</span>
							<input
								class="input"
								type="text"
								bind:value={$dimensionForm.title}
								placeholder="Insert the value name"
							/>
							{#if $dimensionFormErrors.title}
								<span class="text-error-500-400-token">{$dimensionFormErrors.title}</span>
							{/if}
						</label>
						<label class="label">
							<span>Description of new value</span>
							<textarea
								class="textarea"
								bind:value={$dimensionForm.description}
								placeholder="Insert the value description"
							/>
							{#if $dimensionFormErrors.description}
								<span class="text-error-500-400-token">{$dimensionFormErrors.description}</span>
							{/if}
						</label>
						<div>
							<button class="variant-filled-primary btn"> Add New Dimension </button>
						</div>
					</form>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</ThreeColumnLayout>
