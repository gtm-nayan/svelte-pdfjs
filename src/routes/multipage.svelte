<script lang="ts">
	import { browser } from '$app/env';
	import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
	import { Document, Page, PDFJS, preferThisWidth } from 'svelte-pdfjs';

	if (PDFJS.GlobalWorkerOptions) {
		PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
	}

	let maxPages: number = 0;
</script>

{#if browser}
	<Document
		file="/tackling-ts-preview-book.pdf"
		on:loadsuccess={(e) => console.log((maxPages = e.detail.numPages))}
		on:loaderror={console.log}
	>
		{#each Array(maxPages) as _, i}
			<div>
				<Page num={i + 1} getViewport={preferThisWidth(500)} renderTextLayer/>
			</div>
		{/each}
	</Document>
{/if}

<style>
	div {
		position: relative;
		display: grid;
		place-items: center;
	}
</style>
