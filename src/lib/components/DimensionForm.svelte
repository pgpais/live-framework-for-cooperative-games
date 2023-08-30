<script lang="ts">
	import DimensionDetailButton from '$lib/components/DetailElements/DimensionDetailButton.svelte';
	import type { Dimension } from '$lib/db/schema';
	import type { DimensionReportSchema } from '$lib/schemas/report';

	export let value: DimensionReportSchema;
	export let dimension: Dimension;
</script>

<!-- TODO: fix this label for property -->
<label
	for="name"
	class="variant-ringed-primary grid h-fit max-w-xs grid-cols-2 justify-between rounded-xl px-2 py-2"
>
	<div class="text-left">
		<DimensionDetailButton {dimension} />
	</div>

	<div>
		<input class="checkbox" type="checkbox" name="dimension" bind:checked={value.included} />
	</div>

	{#if value.included}
		<!-- div occupy two columns of grid -->
		<div class="col-span-2">
			<textarea
				class="textarea"
				name={'dimension ' + value.title}
				bind:value={value.example}
				placeholder="Write a description of blah blah"
			/>
		</div>
	{/if}
</label>
