<script lang="ts">
	import { browser } from '$app/env';
	import { base } from '$app/paths';
	import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
	import { Document, Page, PDFJS, preferThisWidth } from 'svelte-pdfjs';

	if (PDFJS.GlobalWorkerOptions) {
		PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
	}

	let max_pages: number = 0;
</script>

{#if browser}
	<Document
		file="{base}/tackling-ts-preview-book.pdf"
		on:loadsuccess={(e) => console.log((max_pages = e.detail.numPages))}
		on:loaderror={console.log}
	>
		{#each Array(max_pages) as _, i}
			<div>
				<Page num={i + 1} getViewport={preferThisWidth(500)} renderTextLayer />
			</div>
		{/each}
	</Document>
{/if}

<style>
	div {
		display: grid;
		place-items: center;
	}
</style>
