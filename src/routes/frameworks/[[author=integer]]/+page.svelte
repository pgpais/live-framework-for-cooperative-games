<script lang="ts">
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="justify-left container mx-auto flex h-full pt-10">
	<div class="flex flex-col space-y-10">
		<FrameworkView framework={data.framework} />
		<a
			class="btn-icon variant-filled self-end"
			type="button"
			href="/reports/new/{data.framework.id}"><Plus /></a
		>
	</div>
</div>
