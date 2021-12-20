<script lang="ts">
	import { Document, Page } from '$lib';
	let zoomLevel: number = 1;
	let pageNumber: number = 1;
</script>

<input type="range" step="0.25" max="4" min="1" bind:value={zoomLevel} />
<input type="number" bind:value={pageNumber} />
<Document file="/tackling-ts-preview-book.pdf">
	<div>
		<Page {zoomLevel} {pageNumber}/>
	</div>
</Document>

<style>
	div {
		display: flex;
		place-items: center;
	}
</style>
