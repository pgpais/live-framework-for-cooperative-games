{#if $$slots.left}
	<div
		class="bg-surface-50-900-token border-surface-700-200-token flex-shrink basis-1/4 overflow-auto border-t"
	>
		<slot name="left" />
	</div>
{/if}
<div
	class="bg-surface-100-800-token border-surface-700-200-token flex-grow basis-2/3 overflow-auto border-l-2 border-r-2 border-t"
>
	<slot />
</div>
<div
	class="bg-surface-50-900-token border-surface-700-200-token flex-shrink basis-1/3 overflow-auto border-t"
>
	<slot name="right" />
</div>
