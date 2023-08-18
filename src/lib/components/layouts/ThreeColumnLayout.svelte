<div class="flex h-full w-full">
	<div
		class="bg-surface-50-900-token border-surface-700-200-token h-full flex-shrink basis-1/4 overflow-auto border-t"
	>
		<slot name="left" />
	</div>
	<div
		class="bg-surface-100-800-token border-surface-700-200-token h-full flex-grow basis-1/2 overflow-auto border-l-2 border-r-2 border-t"
	>
		<slot />
	</div>
	<div
		class="bg-surface-50-900-token border-surface-700-200-token h-full flex-shrink basis-1/4 overflow-auto border-t"
	>
		<slot name="right" />
	</div>
</div>
