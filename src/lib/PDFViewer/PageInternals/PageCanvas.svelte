<script lang="ts">
	import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let pageNumber: number = 1;
	export let zoomLevel: number = 1;
	export let desiredHeight: number = undefined;
	export let desiredWidth: number = undefined;

	let currentDoc: Writable<PDFDocumentProxy> = getContext('svelte_pdf_current_doc');
	let pageDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	let renderTask;
	let page: PDFPageProxy;
	let viewport: PageViewport;

	async function renderPage() {
		if (!$currentDoc) return;

		page = await $currentDoc.getPage(pageNumber);
		viewport = page.getViewport({ scale: zoomLevel });

		canvas.width = viewport.width;
		canvas.height = viewport.height;

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
</div>
