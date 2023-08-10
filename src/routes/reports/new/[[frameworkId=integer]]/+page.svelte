<script lang="ts">
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex">
	<div class="flex-grow">report form</div>
	<div class="float-right mr-14 flex-shrink justify-self-end">
		<FrameworkView framework={data.framework} />
	</div>
</div>
