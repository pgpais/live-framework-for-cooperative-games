<script lang="ts">
	import DimensionDetailButton from '$lib/components/DetailElements/DimensionDetailButton.svelte';
	import type { Dimension } from '$lib/db/schema';
	import type { DimensionReportSchema } from '$lib/schemas/report';

	export let value: DimensionReportSchema;
	export let dimension: Dimension;

	const isOfficial = dimension.status == 'official';
</script>

<!-- TODO: fix this label for property -->
<div class="variant-filled-tertiary flex flex-col rounded-xl p-4">
	<div class="flex items-center justify-between gap-2">
		<DimensionDetailButton {dimension} {isOfficial} />

		<input class="checkbox" type="checkbox" name="dimension" bind:checked={value.included} />
	</div>

	{#if value.included}
		<!-- div occupy two columns of grid -->
		<div class="col-span-2 flex flex-col gap-4">
			<label>
				<p class="my-2">Describe how this value appears in the game:</p>
				<textarea
					class="textarea"
					bind:value={value.example}
					placeholder="Write a description of how this value appears in the game"
				/>
			</label>
			<label>
				<p class="my-2">Share a link to an image representing this situation:</p>
				<input
					class="textarea"
					type="url"
					bind:value={value.imageURL}
					placeholder="URL of an image"
				/>
			</label>
		</div>
	{/if}
</div>
