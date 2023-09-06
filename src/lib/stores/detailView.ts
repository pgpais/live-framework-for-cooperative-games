import type { Category, Dimension, FullCategory, PlainDimension } from '$lib/db/schema';
import type { DimensionExample, PlainDimensionExample } from '$lib/db/schema/dimensionExample';
import { writable, type Writable } from 'svelte/store';

export const detailInfoStore: Writable<DetailInfo> = writable();

export type DetailInfo =
	| { type: 'dimension'; data: DetailInfoDimension }
	| { type: 'category'; data: DetailInfoCategory };

export type DetailInfoDimension = { title: string; id: number };

export type DetailInfoCategory = { title: string; id: number };
