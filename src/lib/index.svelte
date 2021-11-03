<script lang="ts">
	import * as pdfJs from 'pdfjs-dist/build/pdf';
	import { onDestroy, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ documentloaded: any }>();

	export let pdfUrl: string;
	export let zoomLevel: number = 1;
	export let pageNumber: number = 1;
	export let customWorkerSrc: string = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfJs.version}/build/pdf.worker.min.js`;
	export let pdfPassword: string = undefined;

	pdfJs.GlobalWorkerOptions.workerSrc = customWorkerSrc;
	let pdfWorker = new pdfJs.PDFWorker();

	onDestroy(() => pdfWorker.destroy());

	let canvas: HTMLCanvasElement;
	let textLayerDiv: HTMLDivElement;

	let pdfDoc;
	let pdfLoadingTask;

	async function loadDoc(url: string, password: string) {
		pdfLoadingTask?.destroy();
		pdfLoadingTask = pdfJs.getDocument({
			url,
			worker: pdfWorker,
			password
		});
		let doc = await pdfLoadingTask.promise;
		dispatch('documentloaded', doc);
		return doc;
	}

	async function renderPage(doc, pageNum: number, pageZoom: number) {
		if (!doc) return;

		let page = await doc.getPage(pageNum);
		let viewport = page.getViewport({ scale: pageZoom });

		canvas.width = Math.floor(viewport.width);
		canvas.height = Math.floor(viewport.height);

		let ctx = canvas.getContext('2d');

		page.render({ viewport, canvasContext: ctx })
	}

	$: loadDoc(pdfUrl, pdfPassword)
		.then((doc) => (pdfDoc = doc))
		.catch((err) => console.log(err));
	$: renderPage(pdfDoc, pageNumber, zoomLevel).catch((err) => console.log(err));
</script>

<div>
	<canvas bind:this={canvas} />
	<div bind:this={textLayerDiv} />
</div>
