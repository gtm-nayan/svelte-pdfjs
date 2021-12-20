<script lang="ts">
	import { Document, Page } from '$lib';
	let zoomLevel: number = 1;
	let pageNumber: number = 1;
	let docUrl = '/tackling-ts-preview-book.pdf';
</script>

<input type="range" step="0.25" max="4" min="1" bind:value={zoomLevel} />
<input type="number" bind:value={pageNumber} />
<input type="radio" value="/tackling-ts-preview-book.pdf" bind:group={docUrl} /> Doc 1
<input type="radio" value="/impatient-js-preview-book.pdf" bind:group={docUrl} /> Doc 2

<Document file={docUrl}>
	<div>
		<Page {zoomLevel} {pageNumber} />
	</div>
</Document>

<style>
	div {
		display: flex;
		place-items: center;
	}
</style>
