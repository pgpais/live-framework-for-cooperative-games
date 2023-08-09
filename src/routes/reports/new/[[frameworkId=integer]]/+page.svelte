<script lang="ts">
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex">
	<div class="flex-grow">report form</div>
	<div class="float-right flex-shrink justify-self-end">framework preview</div>
	<!-- <FrameworkView framework={data.framework}/> -->
</div>
