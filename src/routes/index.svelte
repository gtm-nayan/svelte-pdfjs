<script lang="ts">
	import { Document, Page, PDFJS } from 'svelte-pdfjs';
	import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';

	if (PDFJS.GlobalWorkerOptions) {
		PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
	}
	let zoomLevel: number = 1;
	let pageNumber: number = 1;
	let docUrl = '/tackling-ts-preview-book.pdf';
	let maxPages = 1;
	let renderTextLayer;
</script>

<section class="settings">
	<input type="range" step="0.25" max="4" min="1" bind:value={zoomLevel} />
	<input type="number" bind:value={pageNumber} step="1" min="1" max={maxPages} />

	<input type="radio" value="/tackling-ts-preview-book.pdf" bind:group={docUrl} /> Doc 1
	<input type="radio" value="/impatient-js-preview-book.pdf" bind:group={docUrl} /> Doc 2
	<input type="radio" bind:group={docUrl} value="/yadayada.pdf" /> Doc 3 (doesn't exist)

	<input type="checkbox" bind:checked={renderTextLayer} /> Render text layer
</section>

<Document
	file={docUrl}
	on:loadsuccess={(e) => console.log((maxPages = e.detail.numPages))}
	on:loaderror={console.log}
>
	<div>
		<Page {zoomLevel} {pageNumber} {renderTextLayer} />
	</div>
</Document>

<style>
	div {
		display: grid;
		place-items: center;
	}
</style>
