<script>
	import { LightSwitch, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
</script>

<div class="bg-surface-100-800-token flex justify-between p-5">
	<div>logo</div>
	<TabGroup>
		<TabAnchor href="/frameworks">Framework</TabAnchor>
		<TabAnchor href="/reports/new">New Report</TabAnchor>
		<TabAnchor href="/frameworks/edit">New Framework</TabAnchor>
		<TabAnchor href="/reports">Game Analysis</TabAnchor>
		<!-- <TabAnchor href="/dimensions">Dimensions</TabAnchor> -->
	</TabGroup>
	<div>
		<LightSwitch />
	</div>
</div>
