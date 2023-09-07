import db from '$lib/db';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';

export const load = (async ({ params }) => {
	const reportId = params.id ? +params.id : 1;
	const report = await db.query.reports.findFirst({
		where: (reports, { eq }) => eq(reports.id, reportId),
		with: {
			game: true,
			dimensionExamples: true
		}
	});
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
