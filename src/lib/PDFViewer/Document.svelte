<!-- @component
Renderless component responsible for just loading the document and providing it to
children Page components through the context API (key: svelte_pdf_current_doc)
 -->
<script lang="ts">
	import type {
		DocumentInitParameters,
		OnProgressParameters
	} from 'pdfjs-dist/types/src/display/api';
	import { onMount } from 'svelte';

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

	let InternalDocumentComponent;

	onMount(async () => {
		InternalDocumentComponent = (await import('./DocumentInternal.svelte')).default;
	});
</script>

<svelte:component this={InternalDocumentComponent} {file} {loadOptions} {onProgress}>
	<slot />
</svelte:component>
