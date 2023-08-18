<script lang="ts">
	import DimensionDetailButton from '$lib/components/DetailElements/DimensionDetailButton.svelte';
	import type { Dimension } from '$lib/db/schema';
	import type { DimensionReportSchema } from '$lib/schemas/report';

	export let value: DimensionReportSchema;
	export let dimension: Dimension;
</script>

<!-- TODO: fix this label for property -->
<label for="name" class="text-left">
	<DimensionDetailButton {dimension} />
	<input class="checkbox" type="checkbox" name="dimension" bind:checked={value.included} />
	{#if value.included}
		<input
			class="input"
			type="text"
			name={'dimension ' + value.title}
			bind:value={value.example}
			placeholder="Write a description of blah blah"
		/>
	{/if}
</label>
