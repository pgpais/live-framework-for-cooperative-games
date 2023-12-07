<script lang="ts">
	import type { z } from 'zod';
	import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
	import { games } from '$lib/db/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm, superValidate } from 'sveltekit-superforms/client';
	import type { InsertGameSchema } from '$lib/schemas/game';

	export let data: SuperValidated<InsertGameSchema>;

	const { form, errors, enhance } = superForm(data);
</script>

<form method="POST" use:enhance>
	<!--  -->
	<label>
		<span> Game Title </span>
		<input type="text" name="title" bind:value={$form.name} />
	</label>
	<label>
		<span> Description</span>
		<input type="text" name="description" bind:value={$form.description} />
	</label>
</form>
