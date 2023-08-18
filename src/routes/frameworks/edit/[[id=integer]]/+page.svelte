<script lang="ts">
	import type { FullCategory, FullFramework } from '$lib/db/schema';
	import type { PageData } from './$types';
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import { Edit } from 'lucide-svelte';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import FrameworkEditModal from '$lib/components/FrameworkEditModal.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';

	export let data: PageData;

	let { form } = superForm(data.form);

	const ConcatenateSubCategories = (category: FullCategory) => {
		let subCategories: FullCategory[] = [];
		if (category.subCategories) {
			for (const subCategory of category.subCategories) {
				subCategories.push(subCategory);
				subCategories.push(...ConcatenateSubCategories(subCategory));
			}
		}
		return subCategories;
	};

	const categories: FullCategory[] = [];
	for (const category of data.framework.categories) {
		categories.push(category);
		categories.push(...ConcatenateSubCategories(category));
	}

	const modalComponent: ModalComponent = {
		ref: FrameworkEditModal,
		props: {
			categories,
			value: $form
		}
	};
	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};

	const addCategory = (category: FullCategory) => {
		// add
	};
</script>

<ThreeColumnLayout>
	<svelte:fragment slot="left">
		<SuperDebug data={$form} />
	</svelte:fragment>
	<div class="flex flex-col">
		<FrameworkView framework={data.framework} />
		<button class="btn-icon variant-filled self-end" on:click={() => modalStore.trigger(modal)}
			><Edit /></button
		>
	</div>
</ThreeColumnLayout>
