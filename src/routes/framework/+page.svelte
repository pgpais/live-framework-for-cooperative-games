<script lang="ts">
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container pt-10 h-full mx-auto flex justify-left">
	<div class="space-y-10 flex flex-col">
		{#if data.framework}
			<h2 class="h2">Framework created by {data.framework.author.fullName}</h2>
			<FrameworkView framework={data.framework} />
		{:else}
			<h2 class="h2">Framework not found</h2>
		{/if}
	</div>
</div>
