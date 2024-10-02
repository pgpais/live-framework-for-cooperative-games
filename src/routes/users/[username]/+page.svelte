<script lang="ts">
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';
	import ReportSummary from '$lib/components/ReportSummary.svelte';
	import type { User, Report, Game, frameworks, Framework } from '$lib/db/schema';
	import type { PageData } from './$types';

	export let data: PageData;

	const user: User = data.user;
	const reports: (Report & { game: Game })[] = data.reports;
	const frameworks: Framework[] = data.frameworks;
	const session = data.session;
	console.log(frameworks);
</script>

<!-- <ThreeColumnLayout> -->
<div class="flex w-full flex-col overflow-auto p-8">
	<div class="flex w-full">{user.username}</div>
	<div class="grid w-full grid-cols-2 grid-rows-1 justify-evenly gap-5 p-8">
		<div class="card flex flex-col divide-y-2">
			<h2 class="h2 card-header p-4">Reports</h2>
			<div class="grid grid-cols-2 flex-wrap justify-evenly gap-5 p-5">
				{#if reports}
					{#each reports as report}
						<ReportSummary
							{report}
							game={report.game}
							{user}
							authenticatedAsUser={session?.user.username == user.username}
						/>
					{/each}
				{:else}
					<p>User has not made any reports</p>
				{/if}
			</div>
		</div>
		<div class="card flex flex-col divide-y-2">
			<h2 class="h2 card-header p-4">Frameworks</h2>
			{#if frameworks.length > 0}
				{#each frameworks as framework}
					<div>
						<p>{framework.id}</p>
						<p>{framework.title}</p>
					</div>
				{/each}
			{:else}
				<p>User has not made any reports</p>
			{/if}
		</div>
	</div>
</div>
<!-- </ThreeColumnLayout> -->
