<script lang="ts">
	import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';

	import handleRenderError from '../_utils/handleRenderError';
	import * as pdfJs from 'pdfjs-dist/build/pdf';

	let pageDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let textLayerDiv: HTMLDivElement;

	export let zoomLevel: number;
	export let pageNumber: number;
	export let pdfDoc: PDFDocumentProxy;

	let pageRenderTask;

	async function renderPage(doc: PDFDocumentProxy, pageNum: number, pageZoom: number) {
		if (!doc) return;

		let page: PDFPageProxy = await doc.getPage(pageNum);
		let viewport: PageViewport = page.getViewport({ scale: pageZoom });

		canvas.width = viewport.width;
		canvas.height = viewport.height;
		pageDiv.style.width = `${canvas.width}px`;
		pageDiv.style.height = `${canvas.height}px`;

		let ctx = canvas.getContext('2d');

		pageRenderTask?.cancel();
		pageRenderTask = page.render({ viewport, canvasContext: ctx });
		pageRenderTask.promise.catch(handleRenderError);

		page.getTextContent().then((textContent) => {
			textLayerDiv.style.height = `${canvas.height}px`;
			textLayerDiv.style.width = `${canvas.width}px`;

			textLayerDiv.innerHTML = '';
			pdfJs.renderTextLayer({
				textContent: textContent,
				container: textLayerDiv,
				viewport: viewport,
				textDivs: []
			});
		});
	}

	$: renderPage(pdfDoc, pageNumber, zoomLevel).catch((err) => console.log(err));
</script>

<div class="page-wrapper" bind:this={pageDiv}>
	<canvas bind:this={canvas} />
	<div bind:this={textLayerDiv} class="text-layer" />
</div>

<style>
	.page-wrapper {
		position: relative;
		display: inline-block;
	}

	.text-layer {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		line-height: 1;
		opacity: 0.2;
	}

	.page-wrapper .text-layer > :global(span) {
		color: transparent;
		position: absolute;
		white-space: pre;
		cursor: text;
		transform-origin: 0% 0%;
	}
</style>
