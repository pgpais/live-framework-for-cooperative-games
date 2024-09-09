<script lang="ts">
	import CategoryDetailButton from '$lib/components/DetailElements/CategoryDetailButton.svelte';
	import DimensionDetailButton from '$lib/components/DetailElements/DimensionDetailButton.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import type { FullCategory } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { ChevronLeft, Loader2 } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	export let isDrawer: boolean = false;

	let response: Promise<FullCategory>;
	let isOfficial: boolean;

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	$: {
		isOfficial = $detailInfoStore.data.isOfficial;
		console.log('fetching category with ID', $detailInfoStore.data.id);
		response = fetch(`/api/categories/${$detailInfoStore.data.id}`).then((res) => res.json());
	}
</script>

{#if isOfficial}
	{#await response}
		<Loader2 class="animate-spin" />
	{:then category}
		<div class="p-6">
			<div class="flex items-center">
				{#if isDrawer}
					<button on:click={drawerClose}>
						<ChevronLeft />
					</button>
				{/if}
				<div class="h6">
					{#if category.superCategory}
						{category.superCategory?.superCategory
							? category.superCategory?.superCategory?.title + ' > '
							: '' + category.superCategory?.title
							? category.superCategory?.title
							: ''}
					{/if}
				</div>
			</div>
			<h3 class="h3"><b>{category.title}</b></h3>
			<p>{category.description}</p>
			<Separator verticalMargin={5} width={4} />
			{#if category.subCategories && category.subCategories.length > 0}
				<h4 class="h4">Subcategories</h4>
				<div class="flex w-fit flex-col pl-2 text-start">
					{#each category.subCategories as subCategory}
						<CategoryDetailButton
							category={{
								description: subCategory.description,
								id: subCategory.id,
								isOfficial: subCategory.status == 'official',
								title: subCategory.title
							}}
						/>
					{/each}
				</div>
			{/if}
			{#if category.subCategories && category.subCategories.length > 0 && category.dimensions && category.dimensions.length > 0}
				<Separator verticalMargin={2} width={2} />
			{/if}
			{#if category.dimensions && category.dimensions.length > 0}
				<h2 class="h2">Values</h2>
				<div class="m-3 grid grid-cols-1 justify-items-start gap-y-4">
					{#each category.dimensions as dimension}
						<div class="w-fit">
							<DimensionDetailButton {dimension} />
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/await}
{:else}
	<div>
		<h1 class="h1">{$detailInfoStore.data.title}</h1>
		<p>{$detailInfoStore.data.description}</p>
	</div>
{/if}
