<script>
	import { LightSwitch, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
</script>

<div class="flex justify-between bg-black p-5">
	<div>Put logo here pls</div>
	<TabGroup>
		<TabAnchor href="/frameworks">Framework</TabAnchor>
		<TabAnchor href="/categories">Categories</TabAnchor>
		<TabAnchor href="/dimensions">Dimensions</TabAnchor>
	</TabGroup>
	<div>
		<p>put my stuff at the end</p>
		<LightSwitch />
		<button class="btn variant-filled" type="button">I do nothing</button>
	</div>
</div>
