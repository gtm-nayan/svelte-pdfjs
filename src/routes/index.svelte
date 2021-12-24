<script lang="ts">
	import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

	import { Document, Page } from 'svelte-pdfjs';
	let zoomLevel: number = 1;
	let pageNumber: number = 1;
	let docUrl = '/tackling-ts-preview-book.pdf';
	let maxPages = 1;

	function loadSuccessHandler(evt: CustomEvent<PDFDocumentProxy>) {
		console.log((maxPages = evt.detail.numPages));
	}
</script>

<section class="settings">
	<input type="range" step="0.25" max="4" min="1" bind:value={zoomLevel} />
	<input type="number" bind:value={pageNumber} step="1" min="1" max={maxPages} />

	<input type="radio" value="/tackling-ts-preview-book.pdf" bind:group={docUrl} /> Doc 1
	<input type="radio" value="/impatient-js-preview-book.pdf" bind:group={docUrl} /> Doc 2
	<input type="radio" bind:group={docUrl} value="/yadayada.pdf" /> Doc 3 (doesn't exist)
</section>

<Document file={docUrl} on:loadsuccess={loadSuccessHandler} on:loaderror={console.log}>
	<div>
		<Page {zoomLevel} {pageNumber} />
	</div>
</Document>

<style>
	div {
		display: grid;
		place-items: center;
	}
</style>
