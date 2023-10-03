{#if $$slots.left}
	<div class="bg-surface-50-900-token flex-shrink basis-1/4 overflow-auto">
		<slot name="left" />
	</div>
{/if}
<div class="flex-grow basis-2/3 overflow-auto bg-surface-50 dark:bg-surface-500">
	<slot />
</div>
<div class="flex-shrink basis-1/3 overflow-auto bg-surface-400 dark:bg-surface-900">
	<slot name="right" />
</div>
