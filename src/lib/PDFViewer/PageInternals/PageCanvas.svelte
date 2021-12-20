<script lang="ts">
	import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import TextLayer from './TextLayer.svelte';

	export let pageNumber: number = 1;
	export let zoomLevel: number = 1;
	export let targetHeight: number = undefined;
	export let targetWidth: number = undefined;
	export let rotation: 0 | 90 | 180 | 270 = undefined;

	let currentDoc: Writable<PDFDocumentProxy> = getContext('svelte_pdf_current_doc');
	let pageDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	let renderTask: ReturnType<PDFPageProxy['render']>;
	let page: PDFPageProxy;
	let viewport: PageViewport;

	async function renderPage() {
		if (!$currentDoc) return;

		page?.cleanup();
		page = await $currentDoc.getPage(pageNumber);
		const tmp_viewport = page.getViewport({ scale: 1, rotation });

		if (targetWidth || targetHeight) {
			let scale = targetHeight / tmp_viewport.height;
			if (targetWidth) {
				scale = targetWidth / tmp_viewport.width;
			}
			viewport = page.getViewport({
				scale,
				rotation
			});
		} else {
			viewport = page.getViewport({
				scale: zoomLevel,
				rotation
			});
		}

		canvas.width = viewport.width;
		canvas.height = viewport.height;
		pageDiv.style.width = `${canvas.width}px`;
		pageDiv.style.height = `${canvas.height}px`;

		const canvasContext = canvas.getContext('2d');

		renderTask?.cancel();
		renderTask = page.render({
			canvasContext,
			viewport
		});
	}

	$: {
		$currentDoc;
		pageNumber;
		zoomLevel;
		renderPage();
	}
</script>

<div bind:this={pageDiv}>
	<canvas bind:this={canvas} />
	<TextLayer {page} {viewport} />
</div>

<style>
	div {
		position: relative;
	}

	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
