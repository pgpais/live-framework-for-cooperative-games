<script lang="ts">
	import DimensionDetailButton from '$lib/components/DetailElements/DimensionDetailButton.svelte';
	import type { Dimension } from '$lib/db/schema';
	import { Trash2 } from 'lucide-svelte';

	export let dimension: Dimension;
	export let editable: boolean = false;
	export let onDimensionRemove: (dimension: Dimension) => void = () => {};
</script>

<div class="flex justify-between px-2" class:editable>
	<!-- {dimension.title} -->
	<DimensionDetailButton {dimension} />
	{#if editable}
		<button class="btn-icon btn-icon-sm" on:click={() => onDimensionRemove(dimension)}>
			<Trash2 size={16} />
		</button>
	{/if}
</div>

<style lang="postcss">
	.editable {
		@apply variant-ringed-primary max-w-xs  rounded-xl;
	}
</style>
