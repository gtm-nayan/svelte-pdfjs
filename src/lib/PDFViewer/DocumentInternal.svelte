<script lang="ts" context="module">
	import * as PDFJS from 'pdfjs-dist';
	import type {
		DocumentInitParameters,
		OnProgressParameters,
		PDFDocumentLoadingTask,
		PDFDocumentProxy,
	} from 'pdfjs-dist/types/src/display/api';
	import { createEventDispatcher, setContext } from 'svelte';
	import { readable, writable } from 'svelte/store';
	let PDFWorker = readable<PDFJS.PDFWorker>(null, (set) => {
		const worker = new PDFJS.PDFWorker();
		set(worker);
		return () => worker.destroy();
	});
</script>

<script lang="ts">
	const dispatch = createEventDispatcher<{ loadsuccess: PDFDocumentProxy; loaderror: Error }>();

	export let file: string | URL = undefined;
	export let loadOptions: DocumentInitParameters = undefined;
	export let onProgress: (params: OnProgressParameters) => void = undefined;

	let currentDoc = writable<PDFDocumentProxy>(null);
	let loadingTask: PDFDocumentLoadingTask;
	setContext('svelte_pdf_current_doc', currentDoc);

	function loadDocument() {
		const prevDoc = $currentDoc;
		try {
			loadingTask?.destroy();
			currentDoc.set(null);
			loadingTask = PDFJS.getDocument({ url: file, worker: $PDFWorker, ...loadOptions });
			loadingTask.onProgress = onProgress;
			loadingTask.promise.then((doc) => {
				currentDoc.set(doc);
				dispatch('loadsuccess', doc);
			});
		} catch (err) {
			currentDoc.set(prevDoc);
			dispatch('loaderror', err);
		}
		// TODO: Handle errors and stuff
	}

	$: {
		file;
		loadOptions;
		loadDocument();
	}
</script>

<slot />
