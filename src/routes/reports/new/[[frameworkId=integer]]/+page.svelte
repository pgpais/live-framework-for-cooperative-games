<script lang="ts">
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import Separator from '$lib/components/Separator.svelte';
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import type { NewReport } from '$lib/db/schema/report';

	export let data: PageData;

	const framework = data.framework;
	const report: NewReport = {
		frameworkId: framework.id,
		authorId: 1, //TODO: get from session
		gameId: 1 //TODO: get from somwehre
	};

	const { form } = superForm(data.form, {
		dataType: 'json'
	});
</script>

<div class="flex h-full">
	<SuperDebug data={$form} />
	<div class="flex-grow bg-slate-600/25 px-5">
		<h2 class="h2">New report for Game</h2>
		<Separator />
		<form method="POST" class="flex w-full flex-col gap-3">
			{#each $form.categories as category, i}
				{#if $form.categories[i].superCategoryId == 0}
					<CategoryForm bind:value={$form.categories[i]} />
				{/if}
			{/each}
			<div><button class="btn variant-soft-primary my-2">Submit</button></div>
		</form>
	</div>
	<div class="float-right flex-shrink justify-self-end bg-black/50 px-14">
		<FrameworkView {framework} />
	</div>
</div>
