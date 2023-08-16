<script lang="ts">
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import { superForm, fieldProxy } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import Separator from '$lib/components/Separator.svelte';
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import { TreeView } from '@skeletonlabs/skeleton';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';

	export let data: PageData;
	const framework = data.framework;

	const { form, enhance } = superForm(data.form, {
		dataType: 'json'
	});

	let selected = {
		isCategory: false,
		id: 0
	};
</script>

<ThreeColumnLayout>
	<div slot="left" class="h-full overflow-y-auto">
		<SuperDebug data={$form} />
	</div>
	<div class="px-5">
		<h2 class="h2">New report for Game X</h2>
		<Separator />
		<form method="POST" use:enhance class="flex w-full flex-col gap-3">
			<TreeView>
				{#each $form.categories as category, i}
					<CategoryForm bind:value={$form.categories[i]} bind:selected />
				{/each}
			</TreeView>
			<button class="btn variant-soft-primary my-2">Submit</button>
		</form>
	</div>
	<div class=" h-full overflow-y-auto px-14" slot="right">
		Detail view of dimension/category
		{#if selected.id > 0}
			{#if selected.isCategory}
				<!--  -->
			{:else}{/if}
		{:else}
			<FrameworkView {framework} />
		{/if}
	</div>
</ThreeColumnLayout>
