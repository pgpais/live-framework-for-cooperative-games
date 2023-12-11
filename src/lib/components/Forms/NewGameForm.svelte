<script lang="ts">
	import type { z } from 'zod';
	import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
	import type { games, NewGame } from '$lib/db/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm, superValidate } from 'sveltekit-superforms/client';
	import type { InsertGameSchema } from '$lib/schemas/game';

	export let data: SuperValidated<InsertGameSchema>;

	const { form, errors, enhance } = superForm(data, {
		// Prevent page invalidation, which would otherwise
		// clear the other form when the load function executes again.
		invalidateAll: false
	});
</script>

<form method="POST" action="?/newGame" id="newGame" use:enhance>
	<!--  -->
	<label class="label">
		<span> Game Title </span>
		<input class="input" type="text" name="name" bind:value={$form.name} />
	</label>
	<label class="label">
		<span> Description</span>
		<input class="input" type="text" name="description" bind:value={$form.description} />
	</label>
</form>
