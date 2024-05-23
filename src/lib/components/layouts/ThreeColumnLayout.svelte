<script>
	import { Drawer } from "@skeletonlabs/skeleton";

</script>
{#if $$slots.left}
	<div class="bg-surface-50-900-token flex-shrink basis-1/4 overflow-auto">
		<slot name="left" />
	</div>
{/if}
<div class="flex-grow w-2/3 overflow-auto bg-surface-50 dark:bg-surface-500">
	<slot />
</div>
<div class="hidden xl:block flex-shrink w-1/3 overflow-auto bg-surface-300 dark:bg-surface-900">
	<slot name="right" />
</div>

