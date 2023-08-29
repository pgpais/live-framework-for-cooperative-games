import type { FullCategory, PlainDimension } from '$lib/db/schema';
import type { PlainDimensionExample } from '$lib/db/schema/dimensionExample';
import { writable, type Writable } from 'svelte/store';

export const detailInfoStore: Writable<DetailInfo> = writable();

export type DetailInfo =
	| { type: 'dimension'; data: DetailInfoDimension }
	| { type: 'category'; data: DetailInfoCategory };

export type DetailInfoDimension = PlainDimension & {
	examples?: PlainDimensionExample[];
};

export type DetailInfoCategory = FullCategory;
