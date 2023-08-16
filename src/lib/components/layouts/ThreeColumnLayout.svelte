<div class="flex h-full w-full">
	<div class="h-full flex-shrink basis-1/4 bg-surface-50-900-token border-t border-surface-700-200-token">
		<slot name="left"/>
	</div>
	<div class="h-full flex-grow basis-1/2 bg-surface-100-800-token border-t border-r-2 border-l-2 border-surface-700-200-token">
		<slot />
	</div>
	<div class="h-full flex-shrink basis-1/4 bg-surface-50-900-token border-t border-surface-700-200-token">
		<slot name="right" />
	</div>
</div>
