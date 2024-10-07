import db from '$lib/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dimensionExamples, reports } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
	const reportId = params.id ? +params.id : 1;

	const report = await db.query.reports.findFirst({
		where: (reports, { eq }) => eq(reports.id, reportId),
		with: {
			game: true,
			dimensionExamples: true
		}
	});
	return json(report);
};

export const PUT: RequestHandler = async ({ params, locals }) => {
	console.log('Tried to update report');

	const session = await locals.auth.validate();
	if (session) {
		const reportId = params.id ? +params.id : 1;
		const user = session.user;

		const report = await db.query.reports.findFirst({
			where: (reports, { eq }) => eq(reports.id, reportId)
		});

		if (report) {
			if (user.userId == report.authorId) {
				console.log('user authorized for put');
				console.log('public: ' + report.public);
				const newPublic = await db
					.update(reports)
					.set({ public: !report.public })
					.where(eq(reports.id, reportId))
					.returning({ public: reports.public });
				console.log('new public: ' + newPublic);
				return new Response(null, { status: 204 });
			}
		}
	}
	return new Response(null, { status: 401 });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		const reportId = params.id ? +params.id : 1;
		const user = session.user;

		const report = await db.query.reports.findFirst({
			where: (reports, { eq }) => eq(reports.id, reportId),
			with: {
				dimensionExamples: true
			}
		});

		if (report) {
			if (user.userId == report.authorId) {
				console.log('user authorized for delete');
				console.log('report: ' + report);
				for (const example of report.dimensionExamples) {
					const deletedExample = await db
						.delete(dimensionExamples)
						.where(eq(dimensionExamples.id, example.id))
						.returning();
					console.log('Deleted example ' + deletedExample[0].id);
				}
				const deletedReport = await db.delete(reports).where(eq(reports.id, report.id)).returning();
				console.log('deleted report: ' + deletedReport);
				return new Response(null, { status: 204 });
			}
		}
	}
	return new Response(null, { status: 401 });
};
