<!-- @component
Renderless component responsible for just loading the document and providing it to
children Page components through the context API.
 -->
<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import type { PDFDocumentLoadingTask, PDFDocumentProxy, PDFWorker } from 'pdfjs-dist';
	import type {
		DocumentInitParameters,
		OnProgressParameters,
	} from 'pdfjs-dist/types/src/display/api.js';
	import { createEventDispatcher, getContext, onDestroy, setContext } from 'svelte';
	import { writable } from 'svelte/store';
</script>

<script lang="ts">
	const dispatch = createEventDispatcher();

	interface $$Events {
		/** Dispatched when a document is successfully loaded. */
		loadsuccess: CustomEvent<PDFDocumentProxy>;
		/** Dispatched when there's an error while loading the document. */
		loaderror: CustomEvent<any>;
	}

	/** The URL of the file to load. */
	export let file: string | URL | undefined = undefined;
	/**
	 * Extra options provided to PDFJS.getDocument.
	 * @see https://github.com/mozilla/pdf.js/blob/41dab8e7b6c1e2684d4afabb8f02e40a874d8e85/src/display/api.js#L126
	 */
	export let loadOptions: DocumentInitParameters | undefined = undefined;
	/**
	 * Callback that fires everytime a part of the PDF is downloaded. Can be useful for showing a progress bar.
	 */
	export let onProgress: undefined | ((params: OnProgressParameters) => void) = undefined;

	const worker = getContext<PDFWorker | undefined>('svelte_pdfjs_worker');

	let current_doc = writable<PDFDocumentProxy | null>();
	let loading_task: PDFDocumentLoadingTask;
	setContext('svelte_pdfjs_doc', current_doc);

	onDestroy(() => {
		$current_doc?.destroy();
		$current_doc?.cleanup(false);
	});

	async function load_document() {
		const prev_doc = $current_doc;

		current_doc.set(null);

		const { getDocument } = await import('pdfjs-dist');
		loading_task = getDocument({ url: file, worker, ...loadOptions });
		loading_task.onProgress = onProgress!;
		loading_task.promise
			.then(
				(doc) => {
					prev_doc?.destroy();
					prev_doc?.cleanup();
					dispatch('loadsuccess', doc);
					return doc;
				},
				(err) => {
					dispatch('loaderror', err);
					return prev_doc;
				}
			)
			.then(current_doc.set);
	}
	$: if (browser) file, loadOptions, load_document();
</script>

<slot />
