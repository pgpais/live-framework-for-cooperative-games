<script lang="ts">
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import { Edit, Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';

	export let data: PageData;
</script>

<ThreeColumnLayout>
	<FrameworkView framework={data.framework} />
</ThreeColumnLayout>
