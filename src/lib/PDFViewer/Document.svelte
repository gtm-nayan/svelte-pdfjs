<!-- @component
Renderless component responsible for just loading the document and providing it to
children Page components through the context API (key: svelte_pdf_current_doc)
 -->
<script lang="ts" context="module">
	import * as PDFJS from 'pdfjs-dist/lib/pdf.js';
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
	const dispatch = createEventDispatcher();

	interface $$Events {
		/**
		 * Dispatched when a document is successfully loaded.
		 */
		loadsuccess: CustomEvent<PDFDocumentProxy>;
		/**
		 * Dispatched when there's an error while loading the document.
		 */
		loaderror: CustomEvent<Error>;
	}
	/**
	 * The URL of the file to load.
	 */
	export let file: string | URL = undefined;
	/**
	 * Extra options provided to PDFJS.getDocument. [See 🔗](https://github.com/mozilla/pdf.js/blob/41dab8e7b6c1e2684d4afabb8f02e40a874d8e85/src/display/api.js#L126)
	 */
	export let loadOptions: DocumentInitParameters = undefined;
	/**
	 * Callback that fires everytime a part of the PDF is downloaded. Can be useful for showing a progress bar.
	 */
	export let onProgress: (params: OnProgressParameters) => void = undefined;

	let current_doc = writable<PDFDocumentProxy>(null);
	let loading_task: PDFDocumentLoadingTask;
	setContext('svelte_pdf_current_doc', current_doc);

	function load_document() {
		const previous_doc = $current_doc;
		try {
			loading_task?.destroy();
			current_doc.set(null);
			loading_task = PDFJS.getDocument({ url: file, worker: $PDFWorker, ...loadOptions });
			loading_task.onProgress = onProgress;
			loading_task.promise.then((doc) => {
				current_doc.set(doc);
				dispatch('loadsuccess', doc);
			});
		} catch (err) {
			current_doc.set(previous_doc);
			dispatch('loaderror', err);
		}
		/** @todo Handle errors and stuff */
	}
	$: file, loadOptions, load_document();
</script>

<slot />
