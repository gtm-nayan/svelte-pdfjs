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
	import type {
		OnProgressParameters,
		PDFDocumentLoadingTask,
		PDFDocumentProxy
	} from 'pdfjs-dist/types/src/display/api';
	import SinglePageCanvas from './SinglePageCanvas.svelte';

	const dispatch = createEventDispatcher<{ documentloaded: PDFDocumentProxy }>();

	export let pdfUrl: string;
	export let zoomLevel: number;
	export let pageNumber: number;
	export let pdfPassword: string = undefined;
	export let progressCallback: (progress: OnProgressParameters) => void = undefined;

	let pdfDoc: PDFDocumentProxy;
	let pdfLoadingTask: PDFDocumentLoadingTask;

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

	$: loadDoc(pdfUrl, pdfPassword)
		.then((doc) => (pdfDoc = doc))
		.catch((err) => console.log(err));
</script>

<SinglePageCanvas {pdfDoc} {pageNumber} {zoomLevel} />
