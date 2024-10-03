<script lang="ts">
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';
	import ReportSummary from '$lib/components/ReportSummary.svelte';
	import type { User, Report, Game, frameworks, Framework } from '$lib/db/schema';
	import type { PageData } from './$types';

	export let data: PageData;

	const user: User = data.user;
	let reports: (Report & { game: Game })[] = data.reports;
	const session = data.session;
	function onDeleteReport(report: Report) {
		const reportIndex = reports.findIndex((arrayReport) => arrayReport.id == report.id);
		reports.splice(reportIndex, 1);
		reports = reports;
		console.log(reports);
	}
</script>

<!-- <ThreeColumnLayout> -->
<div class="flex w-full flex-col divide-y divide-dashed overflow-auto p-8">
	<h1 class=" h1 mb-5 flex w-full">{user.username}'s profile</h1>
	<div class="grid w-full justify-evenly gap-5 p-8">
		<div class="card flex w-full flex-col divide-y-2">
			<h2 class="h2 card-header p-4">Reports</h2>
			<div class="flex flex-wrap justify-evenly gap-5 p-5">
				{#if reports}
					{#each reports as report}
						<ReportSummary
							{report}
							game={report.game}
							{user}
							authenticatedAsUser={session?.user.username == user.username}
							{onDeleteReport}
						/>
					{/each}
				{:else}
					<p>User has not made any reports</p>
				{/if}
			</div>
		</div>
		<!-- <div class="card flex flex-col divide-y-2">
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
		</div> -->
	</div>
</div>
<!-- </ThreeColumnLayout> -->
