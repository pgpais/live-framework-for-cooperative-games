<script>
	import { LightSwitch, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
</script>

<div class="flex justify-between bg-black p-5">
	<div>logo</div>
	<TabGroup>
		<TabAnchor href="/frameworks">Framework</TabAnchor>
		<TabAnchor href="/reports/new">New Report</TabAnchor>
		<!-- <TabAnchor href="/dimensions">Dimensions</TabAnchor> -->
	</TabGroup>
	<div>
		<LightSwitch />
	</div>
</div>
