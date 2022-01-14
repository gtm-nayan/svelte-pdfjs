<!-- @component
Render a page from a PDF document. Must be a child of a `Document` component.
 -->
<script context="module" lang="ts">
	import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type PageCanvas from './PageInternals/PageCanvas.svelte';
	import type PageSvg from './PageInternals/PageSVG.svelte';

	type MultipleOf90 = 0 | 90 | 180 | 270;

	function get_viewport(
		page: PDFPageProxy,
		height: number,
		width: number,
		scale: number,
		rotation: MultipleOf90
	) {
		const tmp_viewport = page.getViewport({ scale: 1, rotation });
		if (width || height) {
			let scale = height / tmp_viewport.height;
			if (width) {
				scale = width / tmp_viewport.width;
			}
			return page.getViewport({
				scale,
				rotation,
			});
		}
		return page.getViewport({
			scale,
			rotation,
		});
	}
</script>

<script lang="ts">
	/**
	 * What renderer implementation to use for the page.
	 * SVG rendering not implemented yet.
	 * @default {"canvas"}
	 */
	export let renderer: 'canvas' | 'svg' = 'canvas';
	/**
	 * The page number to show.
	 */
	export let pageNumber: number = 1;
	/**
	 * The scale to show the PDF at.
	 * @default {1}
	 */
	export let zoomLevel: number = 1;
	/**
	 * Override the height to render the page at.
	 * If both `targetHeight` and `targetWidth` are provided, then targetWidth takes precedence.
	 */
	export let targetHeight: number = undefined;
	/**
	 * Override the width to render the page at.
	 * If both `targetHeight` and `targetWidth` are provided, then targetWidth takes precedence.
	 */
	export let targetWidth: number = undefined;
	/**
	 * Rotate the page by a multiple of 90 degrees.
	 * @default {0}
	 */
	export let rotation: MultipleOf90 = 0;
	/**
	 * Render a separate text layer (only for the canvas renderer.)
	 * @default {false}
	 */
	export let renderTextLayer: boolean = false;

	/* <========================================================================================> */

	let InternalPageComponent: PageSvg | PageCanvas;
	onMount(async () => {
		InternalPageComponent = (
			await import(`./PageInternals/Page${renderer === 'svg' ? 'SVG' : 'Canvas'}.svelte`)
		).default;
	});

	/* <========================================================================================> */

	const current_doc: Writable<PDFDocumentProxy> = getContext('svelte_pdf_current_doc');

	let page: PDFPageProxy;
	let viewport: PageViewport;

	/* <========================================================================================> */

	$: if ($current_doc) $current_doc.getPage(pageNumber).then((p) => (page = p));
	$: if (page) viewport = get_viewport(page, targetHeight, targetWidth, zoomLevel, rotation);
</script>

<svelte:component
	this={InternalPageComponent}
	{page}
	{viewport}
	render_text_layer={renderer === 'canvas' ? renderTextLayer : undefined}
/>
