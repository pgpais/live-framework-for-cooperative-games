<script lang="ts">
	import DimensionDetailButton from '$lib/components/DetailElements/DimensionDetailButton.svelte';
	import type { Dimension, DimensionExample } from '$lib/db/schema';
	import { Trash2 } from 'lucide-svelte';

	export let dimension: Dimension;
	export let editable: boolean = false;
	export let onDimensionRemove: (dimension: Dimension) => void = () => {};
	export let dimensionExample: DimensionExample | undefined = undefined;

	const isOfficial = dimension.status == 'official';
</script>

<!-- TODO: if has example, full width and group values with no example descriptions -->
<!-- {#if isOfficial} -->
<div
	class={isOfficial
		? 'flex w-fit justify-between'
		: 'variant-filled-warning flex w-fit justify-between'}
>
	<!-- {dimension.title} -->
	<DimensionDetailButton {dimension} />
	{#if dimensionExample && dimensionExample.example}<span class="mr-2 place-self-center"
			>&nbsp;| {dimensionExample.example}</span
		>
	{/if}
	{#if editable}
		<button
			class="btn-icon btn-icon-sm rounded-none p-2 hover:bg-primary-500/20"
			on:click={() => onDimensionRemove(dimension)}
		>
			<Trash2 size={16} />
		</button>
	{/if}
</div>

<style lang="postcss">
	.editable {
		@apply max-w-xs  rounded-xl;
	}
	.non-editable {
		@apply w-fit;
	}
</style>
