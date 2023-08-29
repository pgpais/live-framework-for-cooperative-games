<script>
	import { page } from '$app/stores';
	import { LightSwitch, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
</script>

<div class="bg-surface-100-800-token flex justify-between p-5">
	<div>logo</div>
	<TabGroup>
		<TabAnchor href="/frameworks" selected={$page.url.pathname === '/frameworks'}>
			Framework
		</TabAnchor>
		<TabAnchor href="/reports/new" selected={$page.url.pathname === '/reports/new'}>
			New Report
		</TabAnchor>
		<TabAnchor href="/frameworks/new" selected={$page.url.pathname === '/frameworks/edit'}>
			New Framework
		</TabAnchor>
		<TabAnchor href="/reports" selected={$page.url.pathname === '/reports'}>
			Game Analysis
		</TabAnchor>
		<!-- <TabAnchor href="/dimensions">Dimensions</TabAnchor> -->
	</TabGroup>
	<div>
		<LightSwitch />
	</div>
</div>
