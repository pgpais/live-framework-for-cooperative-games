<script lang="ts">
	import type { Dimension } from '$lib/db/schema';
	import type { DimensionReportSchema } from '$lib/schemas/report';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let value: DimensionReportSchema;
</script>

<label for="name">
	<span>{value.title}</span>
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
