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

	function default_get_viewport(
		page: PDFPageProxy,
		options: { scale: number; rotation: MultipleOf90 }
	): PageViewport {
		return page.getViewport(options);
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
	export let pageNumber: number;
	/**
	 * The scale to show the PDF at.
	 * @default {1}
	 */
	export let zoomLevel: number = 1;
	// /**
	//  * Override the height to render the page at.
	//  * If both `targetHeight` and `targetWidth` are provided, then targetWidth takes precedence.
	//  */
	// export let targetHeight: number = undefined;
	// /**
	//  * Override the width to render the page at.
	//  * If both `targetHeight` and `targetWidth` are provided, then targetWidth takes precedence.
	//  */
	// export let targetWidth: number = undefined;
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

	/**
	 * A callback invoked with the current page used to determine the viewport.
	 * Use this if you need something more complicated than the default based on scale.
	 */
	export let getViewport: (page: PDFPageProxy) => PageViewport = undefined;

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

	$: _get_viewport =
		getViewport ?? ((p: PDFPageProxy) => default_get_viewport(p, { scale: zoomLevel, rotation }));

	$: if (page) viewport = _get_viewport(page);
</script>

<svelte:component
	this={InternalPageComponent}
	{page}
	{viewport}
	render_text_layer={renderer === 'canvas' ? renderTextLayer : undefined}
/>
