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
		// TODO: Handle errors and stuff
	}

	$: {
		file;
		loadOptions;
		load_document();
	}
</script>

<slot />
