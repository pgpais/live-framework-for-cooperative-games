import db from '$lib/db';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
import type { DimensionExample, Game, Report } from '$lib/db/schema';

export const load = (async ({ params, fetch }) => {
	const reportId = params.id ? +params.id : 1;
	const report: Report & { game: Game; dimensionExamples: DimensionExample[] } = await fetch(
		'/api/reports/' + reportId
	).then((res) => res.json());
	if (!report) {
		throw error(404, { message: 'Report not found' });
	}
	const framework = await GetFullFrameworkById(report?.frameworkId);
	return {
		report,
		framework: framework,
		game: report.game,
		dimensionExamples: report.dimensionExamples
	};
}) satisfies PageServerLoad;
