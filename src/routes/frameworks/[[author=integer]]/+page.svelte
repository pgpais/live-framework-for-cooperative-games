<script lang="ts">
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex h-full justify-center py-10">
	<div class="flex flex-col">
		<FrameworkView framework={data.framework} />
		<a
			class="btn-icon variant-filled self-end"
			type="button"
			href="/reports/new/{data.framework.id}"><Plus /></a
		>
	</div>
</div>
