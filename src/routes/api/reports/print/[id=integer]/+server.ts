import type { FullCategory, Dimension, DimensionExample, Game, Report, User } from '$lib/db/schema';
import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
import type { RequestHandler } from './$types';
import PdfPrinter from 'pdfmake';

export const GET: RequestHandler = async ({ params, setHeaders, fetch }) => {
	const reportId = params.id ? +params.id : 0;
	console.log('reportId', reportId);

	const report: Report & { game: Game; dimensionExamples: DimensionExample[]; author: User } =
		await fetch('/api/reports/' + reportId).then((res) => res.json());

	const fullFramework = await GetFullFrameworkById(report.frameworkId);

	console.log('fullFramework', fullFramework);

	const fonts = {
		Courier: {
			normal: 'Courier',
			bold: 'Courier-Bold',
			italics: 'Courier-Oblique',
			bolditalics: 'Courier-BoldOblique'
		},
		Helvetica: {
			normal: 'Helvetica',
			bold: 'Helvetica-Bold',
			italics: 'Helvetica-Oblique',
			bolditalics: 'Helvetica-BoldOblique'
		},
		Times: {
			normal: 'Times-Roman',
			bold: 'Times-Bold',
			italics: 'Times-Italic',
			bolditalics: 'Times-BoldItalic'
		},
		Symbol: {
			normal: 'Symbol'
		},
		ZapfDingbats: {
			normal: 'ZapfDingbats'
		},
		Roboto: {
			normal: 'Times-Roman'
		}
	};

	const printer = new PdfPrinter(fonts);
	const pdfContent: { text: string; style: string }[] = [];

	for (const category of fullFramework.categories) {
		const halo = categoryToPdf(report.dimensionExamples, category, 1);
		pdfContent.push(...halo);
	}

	const reportDetails = {
		text:
			'Analysis level: ' +
			report.analysisLevel +
			(report.analysisLevel == 'other' ? ' - ' + report.analysisLevelOther : '') +
			' | Analysis type: ' +
			report.analysisType +
			(report.analysisType == 'other' ? ' - ' + report.otherAnalysisType : '')
	};

	const frameworkFeedback = {
		text:
			'Analysis difficulty: ' +
			report.frameworkDifficulty +
			' | Framework comments: ' +
			(report.frameworkComments ? report.frameworkComments : '')
	};

	const titleMargin: [number, number, number, number] | [number, number] = [0, 0, 0, 10];
	const authorMargin: [number, number, number, number] | [number, number] = [0, 0, 0, 10];

	const dd = {
		content: [
			{
				text: report.game.name,
				margin: titleMargin,
				style: ['title'],
				tocItem: true
			},
			{
				text: report.author.username,
				margin: authorMargin,
				style: ['author']
			},
			{
				text: 'www.lfcooperativegames.com/reports/' + report.id,
				margin: authorMargin,
				link: 'www.lfcooperativegames.com/reports/' + report.id,
				style: ['link']
			},
			reportDetails,
			frameworkFeedback,
			...pdfContent
		],
		styles: {
			title: {
				fontSize: 25
			},
			author: {
				fontSize: 15
			},
			link: {
				fontSize: 15,
				color: 'blue'
			}
		}
	};

	const buf = await new Promise<Buffer>((resolve) => {
		const pdfDoc = printer.createPdfKitDocument(dd);
		const buffs: unknown[] = [];
		pdfDoc.on('data', function (d) {
			buffs.push(d as readonly Uint8Array[]);
		});
		pdfDoc.on('end', function () {
			resolve(Buffer.concat(buffs as readonly Uint8Array[]));
		});
		pdfDoc.end();
	});

	setHeaders({
		'Content-Disposition': `attachment; filename="framework-${reportId}.pdf"`
	});

	return new Response(buf);
};

function categoryToPdf(
	dimensionExamples: DimensionExample[],
	category: FullCategory,
	level: number
) {
	const margins: [number, number, number, number] | [number, number] = [level * 10, 4, 0, 4];

	let dimensionsPdf: (
		| { text: string; style: string; margin: [number, number, number, number] | [number, number] }
		| undefined
	)[] = [];
	if (category.dimensions) {
		dimensionsPdf = category.dimensions.map((dimension) =>
			dimensionToPdf(dimensionExamples, dimension, level + 1)
		);
	}
	console.log('dimensionsPdf', dimensionsPdf);

	let categoriesPdf: (
		| { text: string; style: string; margin: [number, number, number, number] | [number, number] }
		| undefined
	)[] = [];
	if (category.subCategories) {
		const protoCategoriesPdf = category.subCategories.map((subCategory) =>
			categoryToPdf(dimensionExamples, subCategory, level + 1)
		);
		categoriesPdf = protoCategoriesPdf.flat();
	}
	console.log('categoriesPdf', categoriesPdf);

	const dimensionsPdfResult: {
		text: string;
		style: string;
		margin: [number, number, number, number] | [number, number];
	}[] = [];
	for (const dimensionPdf of dimensionsPdf) {
		if (dimensionPdf) {
			dimensionsPdfResult.push(dimensionPdf);
		}
	}
	const categoriesPdfResult: {
		text: string;
		style: string;
		margin: [number, number, number, number] | [number, number];
	}[] = [];
	for (const categoryPdf of categoriesPdf) {
		if (categoryPdf) {
			categoriesPdfResult.push(categoryPdf);
		}
	}
	if (categoriesPdfResult.length === 0 && dimensionsPdfResult.length === 0) {
		return [];
	} else {
		return [
			{
				text: category.title,
				style: 'header',
				margin: margins,
				fontSize: 15,
				color: '#847eed'
			},
			...dimensionsPdfResult,
			...categoriesPdfResult
		];
	}
}

function dimensionToPdf(
	dimensionExamples: DimensionExample[],
	dimension: Dimension,
	level: number
) {
	const margins: [number, number, number, number] | [number, number] = [level * 10, 0, 0, 0];

	const examples = dimensionExamples.filter((example) => example.dimensionId === dimension.id);
	if (examples.length === 0) {
		return undefined;
	} else {
		return {
			text: examples[0].example ? dimension.title + ' - ' + examples[0].example : dimension.title,
			style: 'header',
			margin: margins
		};
	}
}
