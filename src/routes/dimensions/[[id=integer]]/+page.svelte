<script lang="ts">
	import Giscus from "@giscus/svelte";
	import type { PageData } from './$types';

	export let data: PageData;

	const { dimension, category, examples } = data;
</script>

<div class="m-5 flex flex-col gap-4 overflow-auto">
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
	{#if examples && examples.length > 0}
		<section>
			<h2 class="h2">Examples:</h2>
			<div class="flex flex-wrap">
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
			</div>
		</section>
	{/if}
	<Giscus id="comments" repo="pgpais/live-framework-for-cooperative-games" repoId="R_kgDOKEw5gg" category="Framework Discussions" categoryId="DIC_kwDOKEw5gs4ChxWY" mapping="specific" term={(category.superCategory? category.superCategory.title + " > " : "") + category.title + " > " + dimension.title} emitMetadata="0" reactionsEnabled="1" inputPosition="top" theme="preferred_color_scheme" lang="en" loading="lazy"/>
</div>

<!-- <script src="https://giscus.app/client.js"
        data-repo="pgpais/live-framework-for-cooperative-games"
        data-repo-id="R_kgDOKEw5gg"
        data-category="Framework Discussions"
        data-category-id="DIC_kwDOKEw5gs4ChxWY"
        data-mapping="specific"
        data-term="[ENTER TERM HERE]"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script> -->
