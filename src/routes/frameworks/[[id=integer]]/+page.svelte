<script lang="ts">
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import type { PageData } from './$types';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';
	import DetailView from '$lib/components/DetailView.svelte';

	export let data: PageData;
</script>

<ThreeColumnLayout>
	<div class="h-full">
		<FrameworkView framework={data.framework} />
	</div>
	<div class="h-full" slot="right">
		<DetailView />
	</div>
</ThreeColumnLayout>
