<script lang="ts">
	import { superForm, superValidate } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';

	import DetailView from '$lib/components/DetailView.svelte';
	import ReportForm from '$lib/components/ReportForm.svelte';
	import { Loader2, Search } from 'lucide-svelte';
	import type { NewGame } from '$lib/db/schema/game';
	import {
		RadioGroup,
		RadioItem,
		RangeSlider,
		Step,
		Stepper,
		getToastStore,
		type ModalSettings,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import type { Framework, FullFramework, Genre, User } from '$lib/db/schema';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import NewGameFormModal from '$lib/components/Modals/NewGameFormModal.svelte';
	import { insertGameSchema } from '$lib/schemas/game';
	import GameCardView from '$lib/components/GameViews/GameCardView.svelte';
	import GameSummaryView from '$lib/components/GameViews/GameSummaryView.svelte';

	export let data: PageData;
	export let form: ActionData;

	let customGame: NewGame | undefined = undefined;
	$: customGame = form?.game;
	$: if (customGame) {
		$reportForm.gameId = customGame.id;
	}

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const modalComponent: ModalComponent = { ref: NewGameFormModal };
	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		// Data
		title: 'Example Alert',
		body: 'This is an example modal.',
		image: 'https://i.imgur.com/WOgTG96.gif',
		meta: { data: data.gameForm }
	};

	const {
		form: reportForm,
		message,
		enhance,
		delayed,
		errors,
		allErrors
	} = superForm(data.form, {
		dataType: 'json',
		onResult({ result }) {
			console.log(result);
			if (result.status === 400) {
				toastStore.trigger({ message: 'There was an error submitting your report' });
			} else if (result.status === 200) {
				toastStore.trigger({ message: 'Report submitted successfully' });
			}
		}
	});

	let isSearching: Boolean | undefined = undefined;
	let gameSearchError: String | undefined = undefined;

	async function getFrameworks() {
		const res = await fetch(`/api/frameworks`);
		const data: (Framework & { author: User })[] = await res.json();
		return data;
	}

	const frameworksRequest = getFrameworks();

	async function getGame(name: string) {
		// Searches for a game through the API
		isSearching = true;
		gameSearchError = undefined;
		const res = await fetch(`/api/games?name=${name}`);
		if (res.ok) {
			const data = await res.json();
			console.log(data);
			gamesData = data;
		} else {
			console.log(res);
			gameSearchError = 'Error ' + res.status + ': ' + res.statusText;
		}
		isSearching = false;
	}

	let gameNameQuery: string;

	let gamesData: (NewGame & {
		genres: { id: number; name: string }[];
		platforms: { id: number; name: string }[];
		companies: { id: number; name: string }[];
	})[];
	let selectedGame:
		| (NewGame & {
				genres: { id: number; name: string }[];
				platforms: { id: number; name: string }[];
				companies: { id: number; name: string }[];
		  })
		| undefined = undefined;

	let selectedFrameworkId: number;
	let framework: FullFramework | undefined = data.framework;

	const isDimensionReported = () => {
		for (let category of $reportForm.categories) {
			if (category.dimensions === undefined) {
				continue;
			}
			for (let dimension of category.dimensions) {
				if (dimension.included) {
					return true;
				}
			}
		}
		return false;
	};

	async function fetchFramework() {
		framework = undefined;

		const response = await fetch(`/api/frameworks/full/${selectedFrameworkId}`);
		const data: FullFramework = await response.json();

		framework = data;

		formatFramework(framework);
	}

	function formatFramework(framework: FullFramework) {
		$reportForm.categories = [];
		for (const category of framework.categories) {
			const i = $reportForm.categories.push(category) - 1;
			const dimensions = $reportForm.categories[i].dimensions;
			if (dimensions === undefined) {
				console.log('no dimensions for category', $reportForm.categories[i].title);
				continue;
			} else {
				for (const dimension of dimensions) {
					dimension.included = false;
				}
				$reportForm.categories[i].dimensions = dimensions;
			}
		}

		$reportForm.frameworkId = framework.id;
	}

	formatFramework(framework);
</script>

<ThreeColumnLayout>
	<!-- <div slot="left">
		<SuperDebug data={$form} />
	</div> -->
	<div class="m-5">
		<form method="POST" action="?/newReport" use:enhance>
			<button type="submit" disabled style="display: none" aria-hidden="true" />
			<Stepper class="card bg-tertiary-800 p-5" buttonCompleteType="submit">
				<!-- Framework Selection -->
				<Step locked={selectedFrameworkId <= 0 || !framework}>
					<svelte:fragment slot="header"
						>Which framework will you base your report on?</svelte:fragment
					>
					{#await frameworksRequest}
						<Loader2 class="mx-5 animate-spin" />
					{:then frameworks}
						<select
							class="select"
							placeholder="Select a framework"
							bind:value={selectedFrameworkId}
							on:change={fetchFramework}
						>
							<option value={0}>Select a framework</option>
							{#each frameworks as framework}
								<option value={framework.id}>
									{framework.title} - {framework.author.username}
								</option>
							{/each}
						</select>
						{#if selectedFrameworkId > 0 && !framework}
							<Loader2 class="mx-5 animate-spin" />
						{/if}
					{/await}
				</Step>

				<!-- Game Selection -->
				<Step locked={selectedGame == undefined && customGame == undefined}>
					<svelte:fragment slot="header">What game are you reporting on?</svelte:fragment>
					<div class="my-5 flex items-center">
						<div class="flex w-full flex-col justify-between gap-3">
							<div class="flex flex-col gap-5">
								<div class="flex justify-between">
									<input
										type="text"
										class="input"
										placeholder="Search for a Game"
										bind:value={gameNameQuery}
										on:submit={() => getGame(gameNameQuery)}
										on:keydown={(e) => {
											if (e.key === 'Enter') {
												getGame(gameNameQuery);
											}
										}}
									/>
									<button
										type="button"
										class="variant-soft-primary btn ml-2"
										on:click={() => getGame(gameNameQuery)}
									>
										<Search />
									</button>
								</div>
								<div class="flex flex-row-reverse">
									<button
										type="button"
										class="variant-soft-primary btn ml-2 max-w-fit"
										on:click={() => modalStore.trigger(modal)}
									>
										Create Custom Game
									</button>
								</div>
							</div>
							{#if isSearching === true}
								<Loader2 class="mx-5 animate-spin" />
							{:else if isSearching === false && gameSearchError}
								<p class="text-error-500">{gameSearchError}</p>
							{:else if isSearching === false}
								<select
									class="select mx-5"
									placeholder="Select your game"
									bind:value={$reportForm.gameId}
									on:change={() => {
										let game = gamesData.find((game) => game.id === $reportForm.gameId);
										if (game) {
											selectedGame = game;
										} else {
											selectedGame = undefined;
										}
									}}
								>
									<option value={0}>Select your Game</option>
									{#each gamesData as gameData}
										<option value={gameData.id}>
											{gameData.name}
										</option>
									{/each}
								</select>
							{/if}
							<!-- if gameForm was submitted show custom game) -->
							{#if selectedGame && $reportForm.gameId > 0}
								<GameSummaryView game={selectedGame} />
							{:else if customGame}
								<GameSummaryView game={customGame} />
							{/if}
						</div>
					</div>
				</Step>

				<!-- Additional Details: Game Mode, Analysis level (Game Analysis (Macro), Specific Moment (Micro)), all values or only relevant, subjective goal -->
				<Step>
					<div class="card flex flex-col gap-3 p-5">
						<label>
							<p>Game Mode</p>
							<RadioGroup display="contents lg:inline-flex">
								<RadioItem bind:group={$reportForm.gameMode} name="gameMode" value={'coopCampaign'}>
									Cooperative Campaign
								</RadioItem>
								<RadioItem
									bind:group={$reportForm.gameMode}
									name="gameMode"
									value={'competitiveTeamPlay'}
								>
									Competitive Team Play
								</RadioItem>
								<RadioItem
									bind:group={$reportForm.gameMode}
									name="gameMode"
									value={'coopScenarios'}
								>
									Cooperative Scenarios
								</RadioItem>
								<RadioItem bind:group={$reportForm.gameMode} name="gameMode" value={'other'}>
									Other
								</RadioItem>
							</RadioGroup>

							{#if $reportForm.gameMode == 'other'}
								<textarea
									class="textarea"
									placeholder="Please specify"
									bind:value={$reportForm.gameModeOther}
								/>
							{/if}
						</label>
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<label>
							<p>Analysis Level</p>
							<RadioGroup display="contents lg:inline-flex">
								<RadioItem
									bind:group={$reportForm.analysisLevel}
									name="analysisLevel"
									value={'macro'}
								>
									Game Analysis (Macro)
								</RadioItem>
								<RadioItem
									bind:group={$reportForm.analysisLevel}
									name="analysisLevel"
									value={'micro'}
								>
									Specific Moment (Micro)
								</RadioItem>
								<RadioItem
									bind:group={$reportForm.analysisLevel}
									name="analysisLevel"
									value={'other'}
								>
									Other
								</RadioItem>
							</RadioGroup>

							{#if $reportForm.analysisLevel == 'other'}
								<textarea
									class="textarea"
									placeholder="Please specify"
									bind:value={$reportForm.analysisLevelOther}
								/>
							{/if}
						</label>
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<label>
							<p>Value Identification</p>
							<RadioGroup display="contents lg:inline-flex">
								<RadioItem
									bind:group={$reportForm.valueIdentification}
									name="valueIdentification"
									value={'all'}
								>
									All Values
								</RadioItem>
								<RadioItem
									bind:group={$reportForm.valueIdentification}
									name="valueIdentification"
									value={'relevant'}
								>
									Only Relevant Values
								</RadioItem>
								<RadioItem
									bind:group={$reportForm.valueIdentification}
									name="valueIdentification"
									value={'other'}
								>
									Other
								</RadioItem>
							</RadioGroup>

							{#if $reportForm.valueIdentification == 'other'}
								<textarea
									class="textarea"
									placeholder="Please specify"
									bind:value={$reportForm.valueIdentificationOther}
								/>
							{/if}
						</label>
					</div>

					<label>
						<span>Subjective Goal:</span>
						<textarea class="textarea" bind:value={$reportForm.goal} />
					</label>
				</Step>

				<!-- Report form -->
				<Step>
					<h2 class="h2 mb-5">
						Report for <i
							>{selectedGame
								? selectedGame.name
								: customGame
								? customGame.name
								: 'an unselected game'}</i
						>
						based on Framework
						<i>{framework?.title}</i>
					</h2>

					<!-- <svelte:fragment slot="header">(header)</svelte:fragment> -->
					<!-- <TreeView> -->
					{#if $message}
						<p class="text-error-900">{$message}</p>
					{/if}
					<ReportForm bind:value={$reportForm} />
					<!-- </TreeView> -->
					<!-- <button class="btn variant-soft-primary my-2">Submit</button> -->
				</Step>

				<!-- Last Questions -->
				<Step locked={$delayed}>
					{#if $allErrors.length}
						<div class="card variant-soft-error p-5">
							<h3 class="h3">There were errors in your report</h3>
							<ul class="list-inside list-disc">
								{#each $allErrors as error}
									{#each error.messages as message}
										<li>{message}</li>
									{/each}
								{/each}
							</ul>
						</div>
					{/if}

					<div class="card flex flex-col gap-3 p-5">
						<RangeSlider
							name="range-slider"
							bind:value={$reportForm.frameworkDifficulty}
							min={1}
							max={5}
							step={1}
						>
							<div class="flex items-center justify-between">
								<p>
									How difficult was it to analyse the game with LFCG? (1 is very easy, 5 is very
									hard)
								</p>
								<div class="text-xs">{$reportForm.frameworkDifficulty} / {5}</div>
							</div>
						</RangeSlider>
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<p>Analysis Type</p>
						<RadioGroup display="contents lg:inline-flex">
							<RadioItem bind:group={$reportForm.analysisType} name="analysisType" value={'played'}>
								Played it
							</RadioItem>
							<RadioItem
								bind:group={$reportForm.analysisType}
								name="analysisType"
								value={'pastPlayed'}
							>
								Played it in the past
							</RadioItem>
							<RadioItem
								bind:group={$reportForm.analysisType}
								name="analysisType"
								value={'observations'}
							>
								Observations
							</RadioItem>
							<RadioItem bind:group={$reportForm.analysisType} name="analysisType" value={'other'}>
								Other
							</RadioItem>
						</RadioGroup>

						{#if $reportForm.analysisType == 'other'}
							<textarea
								class="textarea"
								placeholder="Please specify"
								bind:value={$reportForm.otherAnalysisType}
							/>
						{/if}
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<label>
							<span>Describe your analysis process</span>
							<textarea class="textarea" bind:value={$reportForm.analysisDescription} />
						</label>
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<label>
							<span>Any further comments to the framework you would like to make?</span>
							<textarea class="textarea" bind:value={$reportForm.frameworkComments} />
						</label>
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<p>
							By making this report public, it will appear in searches and in related pages. If you
							don't wish to make this report public, it will only be accessible through its URL. You
							will be able to print its page to a PDF file, for offline use.
						</p>
						<label class="label">
							Do you wish to make this report public?
							<input type="checkbox" bind:checked={$reportForm.public} />
						</label>
						{#if $delayed}
							<Loader2 class="mx-5 animate-spin" />
						{/if}
					</div>
				</Step>
			</Stepper>
		</form>
	</div>
	<div class="m-6" slot="right">
		<DetailView />
	</div>
</ThreeColumnLayout>
