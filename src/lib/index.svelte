<script lang="ts" context="module">
	import * as pdfJs from 'pdfjs-dist/build/pdf';
	import { readable } from 'svelte/store';

	pdfJs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfJs.version}/build/pdf.worker.min.js`;
	let pdfWorker = readable({}, (set) => {
		const worker = new pdfJs.PDFWorker();
		set(worker);
		return () => worker.destroy();
	});
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import handleRenderError from './_utils/handleRenderError';
	import type {
		OnProgressParameters,
		PDFDocumentLoadingTask,
		PDFDocumentProxy
	} from 'pdfjs-dist/types/src/display/api';

	const dispatch = createEventDispatcher<{ documentloaded: PDFDocumentProxy }>();

	export let pdfUrl: string;
	export let zoomLevel: number = 1;
	export let pageNumber: number = 1;
	export let pdfPassword: string = undefined;
	export let progressCallback: (progress: OnProgressParameters) => void = undefined;

	let canvas: HTMLCanvasElement;
	let textLayerDiv: HTMLDivElement;
	let pageDiv: HTMLDivElement;

	let pdfDoc: PDFDocumentProxy;
	let pdfLoadingTask: PDFDocumentLoadingTask;
	let pageRenderTask;

	async function loadDoc(url: string, password: string) {
		pdfLoadingTask?.destroy();
		pdfDoc = null;
		pdfLoadingTask = pdfJs.getDocument({
			url,
			worker: $pdfWorker,
			password
		});
		pdfLoadingTask.onProgress = progressCallback;
		let doc = await pdfLoadingTask.promise;
		dispatch('documentloaded', doc);
		return doc;
	}

	async function renderPage(doc, pageNum: number, pageZoom: number) {
		if (!doc) return;

		let page = await doc.getPage(pageNum);
		let viewport = page.getViewport({ scale: pageZoom });

		canvas.width = viewport.width;
		canvas.height = viewport.height;

		let ctx = canvas.getContext('2d');

		pageRenderTask?.cancel();
		pageRenderTask = page.render({ viewport, canvasContext: ctx });
		pageRenderTask.promise.catch(handleRenderError);
	}

	$: loadDoc(pdfUrl, pdfPassword)
		.then((doc) => (pdfDoc = doc))
		.catch((err) => console.log(err));
	$: renderPage(pdfDoc, pageNumber, zoomLevel).catch((err) => console.log(err));
</script>

<div class="svpdf-page-wrapper" bind:this={pageDiv}>
	<canvas bind:this={canvas} />
	<div bind:this={textLayerDiv} class="textLayer" />
</div>

<style>
	.svpdf-page-wrapper {
		position: relative;
	}

	canvas {
		margin: 0;
		display: block;
	}

	.textLayer {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		opacity: 0.2;
		line-height: 1;
	}

	:global(.svpdf-page-wrapper .textLayer > div) {
		color: transparent;
		position: absolute;
		white-space: pre;
		cursor: text;
		-webkit-transform-origin: 0% 0%;
		-moz-transform-origin: 0% 0%;
		-o-transform-origin: 0% 0%;
		-ms-transform-origin: 0% 0%;
		transform-origin: 0% 0%;
	}
</style>
