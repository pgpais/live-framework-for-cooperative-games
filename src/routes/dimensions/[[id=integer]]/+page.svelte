<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { dimension, category, examples } = data;
</script>

<div class="m-5 flex flex-col gap-4">
	<section>
		<span class="h3">
			{category.superCategory ? category.superCategory.title + ' > ' : ''}{category.title}
		</span>
		<h1 class="h1">
			{dimension.title}
		</h1>
		<p class="mt-3 text-lg">
			{dimension.description}
		</p>
	</section>
	<section>
		<h2 class="h2">Examples:</h2>
		{#each examples as example}
			<div class="card card-hover m-4 h-96 w-96 p-4">
				<div class="card-header flex w-full flex-col">
					<h4 class="h4">
						{example.report.game.name}
					</h4>
					<b class="">
						created by {example.report.author.username}
					</b>
					<img
						src={example.report.game.imgUrl}
						alt={example.report.game.name}
						class="h-44 object-contain"
					/>
				</div>
				<section class="mx-4 mt-4 line-clamp-4">
					{example.example}
				</section>
			</div>
		{/each}
	</section>
</div>
