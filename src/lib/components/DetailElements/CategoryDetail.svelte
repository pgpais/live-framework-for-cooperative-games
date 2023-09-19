<script lang="ts">
	import CategoryDetailButton from '$lib/components/DetailElements/CategoryDetailButton.svelte';
	import DimensionDetailButton from '$lib/components/DetailElements/DimensionDetailButton.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import type { FullCategory } from '$lib/db/schema';
	import { detailInfoStore, type DetailInfoCategory } from '$lib/stores/detailView';
	import { Loader2 } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	let response: Promise<FullCategory>;

	$: {
		console.log('fetching category with ID', $detailInfoStore.data.id);
		response = fetch(`/api/categories/${$detailInfoStore.data.id}`).then((res) => res.json());
	}
</script>

{#await response}
	<Loader2 class="animate-spin" />
{:then category}
	<div>
		<h1 class="h1">{category.title}</h1>
		<p>{category.description}</p>
		<Separator verticalMargin={5} width={4} />
		{#if category.subCategories && category.subCategories.length > 0}
			<h2 class="h2">Subcategories</h2>
			<ul class="list-inside list-disc">
				{#each category.subCategories as subCategory}
					<li><CategoryDetailButton category={subCategory} /></li>
				{/each}
			</ul>
		{/if}
		{#if category.subCategories && category.subCategories.length > 0 && category.dimensions && category.dimensions.length > 0}
			<Separator verticalMargin={2} width={2} />
		{/if}
		{#if category.dimensions && category.dimensions.length > 0}
			<h2 class="h2">Values</h2>
			<ul class="list-inside list-disc">
				{#each category.dimensions as dimension}
					<li><DimensionDetailButton {dimension} /></li>
				{/each}
			</ul>
		{/if}
	</div>
{/await}
