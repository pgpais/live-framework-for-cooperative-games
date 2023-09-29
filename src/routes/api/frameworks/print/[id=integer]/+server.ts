import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import PdfPrinter from 'pdfmake';
import type { Category, Dimension, FullCategory } from '$lib/db/schema';

export const GET: RequestHandler = async ({ params, setHeaders }) => {
	const frameworkId = params.id ? +params.id : 0;
	console.log('frameworkId', frameworkId);

	const fullFramework = await GetFullFrameworkById(frameworkId);

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
		const halo = categoryToPdf(category, 1);
		pdfContent.push(...halo);
	}
	const dd = {
		content: pdfContent
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
		'Content-Disposition': `attachment; filename="framework-${frameworkId}.pdf"`
	});

	return new Response(buf);
};

function categoryToPdf(category: FullCategory, level: number) {
	let dimensionsPdf: { text: string; style: string }[] = [];
	if (category.dimensions) {
		dimensionsPdf = category.dimensions.map((dimension) => dimensionToPdf(dimension, level + 1));
	}

	let categoriesPdf: { text: string; style: string }[] = [];
	if (category.subCategories) {
		const protoCategoriesPdf = category.subCategories.map((subCategory) =>
			categoryToPdf(subCategory, level + 1)
		);
		categoriesPdf = protoCategoriesPdf.flat();
	}

	return [
		{
			text: category.title,
			style: 'header',
			margin: [level * 10, 4, 0, 4]
		},
		...dimensionsPdf,
		...categoriesPdf
	];
}

function dimensionToPdf(dimension: Dimension, level: number) {
	return {
		text: dimension.title,
		style: 'header',
		margin: [level * 10, 0, 0, 0]
	};
}
