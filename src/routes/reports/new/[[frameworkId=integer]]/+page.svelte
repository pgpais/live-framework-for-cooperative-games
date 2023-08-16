<script lang="ts">
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import { superForm, fieldProxy } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import Separator from '$lib/components/Separator.svelte';
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import { TreeView } from '@skeletonlabs/skeleton';

	export let data: PageData;
	const framework = data.framework;

	const { form, enhance } = superForm(data.form, {
		dataType: 'json'
	});
</script>

<div class="flex h-full">
	<SuperDebug data={$form} />
	<div class="flex-grow bg-slate-600/25 px-5">
		<h2 class="h2">New report for Game</h2>
		<Separator />
		<form method="POST" use:enhance class="flex w-full flex-col gap-3">
			<TreeView>
				{#each $form.categories as category, i}
					<CategoryForm bind:value={$form.categories[i]} />
				{/each}
			</TreeView>
			<button class="btn variant-soft-primary my-2">Submit</button>
		</form>
	</div>
	<div class="float-right flex-shrink justify-self-end bg-black/50 px-14">
		<FrameworkView {framework} />
	</div>
</div>
