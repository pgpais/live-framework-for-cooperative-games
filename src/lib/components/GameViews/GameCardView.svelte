<script lang="ts">
	import type { Game, Genre, NewGame } from '$lib/db/schema';

	export let game: NewGame & { genres?: Genre[] };
</script>

<div class="card variant-ghost-tertiary flex p-5">
	<div class="card-header flex w-1/3 flex-col gap-2">
		<h3 class="h3">{game.name}</h3>
		{#if game.imgUrl}
			<img src={game.imgUrl} alt={game.name} class="h-64 w-full object-contain" />
		{:else}
			<div class="variant-outline-warning flex h-64 w-full items-center justify-center">
				<p class="p">No image available</p>
			</div>
		{/if}
	</div>
	<div class="flex w-2/3 flex-col gap-4">
		{#if game.releaseDate}
			<p class="p">
				<b>Release Date: </b>{Intl.DateTimeFormat('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}).format(new Date(0).setUTCSeconds(+game.releaseDate))}
			</p>
		{/if}
		{#if game.genres}
			<p class="p">
				<b>Genres: </b>
				{#each game.genres as genre}
					<span>{genre.name}&nbsp;</span>
				{/each}
			</p>
		{/if}
		{#if game.description}
			<p class="p"><b>Description: </b>{game.description}</p>
		{/if}
	</div>
</div>
