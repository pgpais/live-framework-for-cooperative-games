<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import Separator from '$lib/components/Separator.svelte';
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';

	import DetailView from '$lib/components/DetailView.svelte';

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
	<div slot="left">
		<SuperDebug data={$form} />
	</div>
	<div class="px-5">
		<h2 class="h2">New report for Game X</h2>
		<Separator />
		<form method="POST" use:enhance>
			<!-- <TreeView> -->
			<ul class="ml-2 list-inside list-disc gap-2">
				{#each $form.categories as category, i}
					<li>
						<CategoryForm bind:value={$form.categories[i]} />
					</li>
				{/each}
			</ul>
			<!-- </TreeView> -->
			<button class="btn variant-soft-primary my-2">Submit</button>
		</form>
	</div>
	<div class="m-6" slot="right">
		<DetailView />
	</div>
</ThreeColumnLayout>
