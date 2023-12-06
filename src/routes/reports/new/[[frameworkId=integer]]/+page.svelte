<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
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
		getToastStore
	} from '@skeletonlabs/skeleton';
	import type { Framework, FullFramework, User } from '$lib/db/schema';

	export let data: PageData;

	const toastStore = getToastStore();

	const { form, message, enhance, delayed, errors, allErrors } = superForm(data.form, {
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

	async function getFrameworks() {
		const res = await fetch(`/api/frameworks`);
		const data: (Framework & { author: User })[] = await res.json();
		return data;
	}

	const frameworksRequest = getFrameworks();

	async function getGame(name: string) {
		// Searches for a game through the API
		isSearching = true;
		const res = await fetch(`/api/games?name=${name}`);
		const data = await res.json();
		console.log(data);
		gamesData = data;
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

	let selectedFrameworkId: number = 1;
	let framework: FullFramework | undefined = undefined;

	const isDimensionReported = () => {
		for (let category of $form.categories) {
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

		$form.categories = [];
		for (const category of framework.categories) {
			const i = $form.categories.push(category) - 1;
			const dimensions = $form.categories[i].dimensions;
			if (dimensions === undefined) {
				console.log('no dimensions for category', $form.categories[i].title);
				continue;
			} else {
				for (const dimension of dimensions) {
					dimension.included = false;
				}
				$form.categories[i].dimensions = dimensions;
			}
		}

		$form.frameworkId = framework.id;
	}

	if (selectedFrameworkId > 0) {
		fetchFramework();
	}
</script>

<ThreeColumnLayout>
	<!-- <div slot="left">
		<SuperDebug data={$form} />
	</div> -->
	<div class="m-5">
		<form method="POST" use:enhance>
			<button type="submit" disabled style="display: none" aria-hidden="true" />
			<Stepper class="card variant-filled-tertiary p-5" buttonCompleteType="submit">
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
				<Step locked={selectedGame == undefined}>
					<svelte:fragment slot="header">What game are you reporting on?</svelte:fragment>
					<div class="my-5 flex items-center">
						<div class="flex w-full flex-col gap-3">
							<div>
								<input
									type="text"
									class="input w-1/4"
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
							{#if isSearching === true}
								<Loader2 class="mx-5 animate-spin" />
							{:else if isSearching === false}
								<select
									class="select mx-5"
									placeholder="Select your game"
									bind:value={$form.gameId}
									on:change={() => {
										let game = gamesData.find((game) => game.id === $form.gameId);
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
							{#if selectedGame && $form.gameId > 0}
								<div class="card variant-ghost-tertiary flex p-5">
									<div class="card-header flex w-1/3 flex-col gap-2">
										<h3 class="h3">{selectedGame.name}</h3>
										{#if selectedGame.imgUrl}
											<img
												src={selectedGame.imgUrl}
												alt={selectedGame.name}
												class="h-64 w-full object-contain"
											/>
										{:else}
											<div
												class="variant-outline-warning flex h-64 w-full items-center justify-center"
											>
												<p class="p">No image available</p>
											</div>
										{/if}
									</div>
									<div class="flex w-2/3 flex-col gap-4">
										{#if selectedGame.releaseDate}
											<p class="p">
												<b>Release Date: </b>{Intl.DateTimeFormat('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric'
												}).format(new Date(0).setUTCSeconds(+selectedGame.releaseDate))}
											</p>
										{/if}
										{#if selectedGame.genres}
											<p class="p">
												<b>Genres: </b>
												{#each selectedGame.genres as genre}
													<span>{genre.name}&nbsp;</span>
												{/each}
											</p>
										{/if}
										{#if selectedGame.description}
											<p class="p"><b>Description: </b>{selectedGame.description}</p>
										{/if}
									</div>
								</div>
							{/if}
						</div>
					</div>
				</Step>

				<!-- Additional Details: Game Mode, Analysis level (Game Analysis (Macro), Specific Moment (Micro)), all values or only relevant, subjective goal -->
				<Step>
					<div class="card flex flex-col gap-3 p-5">
						<label>
							<span>Game Mode:</span>
							<RadioGroup>
								<RadioItem bind:group={$form.gameMode} name="gameMode" value={'coopCampaign'}>
									Cooperative Campaign
								</RadioItem>
								<RadioItem
									bind:group={$form.gameMode}
									name="gameMode"
									value={'competitiveTeamPlay'}
								>
									Competitive Team Play
								</RadioItem>
								<RadioItem bind:group={$form.gameMode} name="gameMode" value={'coopScenarios'}>
									Cooperative Scenarios
								</RadioItem>
								<RadioItem bind:group={$form.gameMode} name="gameMode" value={'other'}>
									Other
								</RadioItem>
							</RadioGroup>

							{#if $form.analysisLevel == 'other'}
								<textarea
									class="textarea"
									placeholder="Please specify"
									bind:value={$form.analysisLevelOther}
								/>
							{/if}
						</label>
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<label>
							<span>Analysis Level:</span>
							<RadioGroup>
								<RadioItem bind:group={$form.analysisLevel} name="analysisLevel" value={'macro'}>
									Game Analysis (Macro)
								</RadioItem>
								<RadioItem bind:group={$form.analysisLevel} name="analysisLevel" value={'micro'}>
									Specific Moment (Micro)
								</RadioItem>
								<RadioItem bind:group={$form.analysisLevel} name="analysisLevel" value={'other'}>
									Other
								</RadioItem>
							</RadioGroup>

							{#if $form.analysisLevel == 'other'}
								<textarea
									class="textarea"
									placeholder="Please specify"
									bind:value={$form.analysisLevelOther}
								/>
							{/if}
						</label>
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<label>
							<span>Value Identification:</span>
							<RadioGroup>
								<RadioItem
									bind:group={$form.valueIdentification}
									name="valueIdentification"
									value={'all'}
								>
									All Values
								</RadioItem>
								<RadioItem
									bind:group={$form.valueIdentification}
									name="valueIdentification"
									value={'relevant'}
								>
									Only Relevant Values
								</RadioItem>
								<RadioItem
									bind:group={$form.valueIdentification}
									name="valueIdentification"
									value={'other'}
								>
									Other
								</RadioItem>
							</RadioGroup>

							{#if $form.valueIdentification == 'other'}
								<textarea
									class="textarea"
									placeholder="Please specify"
									bind:value={$form.valueIdentificationOther}
								/>
							{/if}
						</label>
					</div>

					<label>
						<span>Subjective Goal:</span>
						<textarea class="textarea" bind:value={$form.goal} />
					</label>
				</Step>

				<!-- Report form -->
				<Step>
					<h2 class="h2 mb-5">
						Report for <i>{selectedGame ? selectedGame.name : 'an unselected game'}</i> based on
						Framework
						<i>{framework?.title}</i>
					</h2>

					<!-- <svelte:fragment slot="header">(header)</svelte:fragment> -->
					<!-- <TreeView> -->
					{#if $message}
						<p class="text-error-900">{$message}</p>
					{/if}
					<ReportForm bind:value={$form} />
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
							bind:value={$form.frameworkDifficulty}
							min={1}
							max={5}
							step={1}
						>
							<div class="flex items-center justify-between">
								<div class="font-bold">
									How difficult was it to analyse the game with LFCG? (1 is very easy, 5 is very
									hard)
								</div>
								<div class="text-xs">{$form.frameworkDifficulty} / {5}</div>
							</div>
						</RangeSlider>
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<RadioGroup>
							<RadioItem bind:group={$form.analysisType} name="analysisType" value={'played'}>
								Played it
							</RadioItem>
							<RadioItem bind:group={$form.analysisType} name="analysisType" value={'pastPlayed'}>
								Played it in the past
							</RadioItem>
							<RadioItem bind:group={$form.analysisType} name="analysisType" value={'observations'}>
								Observations
							</RadioItem>
							<RadioItem bind:group={$form.analysisType} name="analysisType" value={'other'}>
								Other
							</RadioItem>
						</RadioGroup>

						{#if $form.analysisType == 'other'}
							<textarea
								class="textarea"
								placeholder="Please specify"
								bind:value={$form.otherAnalysisType}
							/>
						{/if}
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<label>
							<span>Describe your analysis process</span>
							<textarea class="textarea" bind:value={$form.analysisDescription} />
						</label>
					</div>

					<div class="card flex flex-col gap-3 p-5">
						<label>
							<span>Any further comments to the framework you would like to make?</span>
							<textarea class="textarea" bind:value={$form.frameworkComments} />
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
							<input type="checkbox" bind:checked={$form.public} />
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
