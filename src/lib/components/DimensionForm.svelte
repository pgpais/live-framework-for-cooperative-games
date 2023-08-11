<script lang="ts">
	import type { Dimension } from '$lib/db/schema';
	import type { DimensionReportSchema } from '$lib/schemas/report';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let dimensionName: string;
	export let value: { checked?: boolean; example?: string };
</script>

<label for="name">
	<span>{dimensionName}</span>
	<input class="checkbox" type="checkbox" name="dimension" bind:checked={value.checked} />
	{#if value.checked}
		<input
			class="input"
			type="text"
			name={'dimension ' + dimensionName}
			bind:value={value.example}
			placeholder="Write a description of blah blah"
		/>
	{/if}
</label>
