<script lang="ts">
	import type { FullCategory } from '$lib/db/schema';
	import type {
		FrameworkEditFormSchema	} from '$lib/schemas/frameworkEdit';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

	let tabset: number = 0;
	export let categories: FullCategory[] = [];
	export let value: FrameworkEditFormSchema;
</script>

<div class="w-modal p-7">
	<TabGroup>
		<Tab bind:group={tabset} name="dimension" value={0}>
			<svelte:fragment slot="lead">
				<TabAnchor>Dimension</TabAnchor>
			</svelte:fragment>
		</Tab>
		<Tab bind:group={tabset} name="category" value={1}>
			<TabAnchor>Category</TabAnchor>
		</Tab>
		<svelte:fragment slot="panel">
			<form method="dialog">
				<label>
					<span>Parent Category (Leave empty if root category)</span>
					<select class="select">
						<option value="">None</option>
						{#each categories as category}
							<option value={category.id}>{category.title}</option>
						{/each}
					</select>
				</label>
				{#if tabset === 0}
					<label>
						<span>Dimension name</span>
						<input
							class="input"
							type="text"
							title="Category name"
							placeholder="Input dimension name"
						/>
					</label>
				{:else if tabset === 1}
					<label>
						<span>Category name</span>
						<input
							class="input"
							type="text"
							title="Category name"
							placeholder="Input category name"
						/>
					</label>
				{/if}
				<label
					><span>Description</span>
					<input class="input" type="text" title="Description" placeholder="Input description" />
				</label>
			</form>
		</svelte:fragment>
	</TabGroup>
</div>
