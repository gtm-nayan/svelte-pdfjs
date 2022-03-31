<script lang="ts">
	import { browser } from '$app/env';
	import { base } from '$app/paths';
	import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
	import { Document, type MultipleOf90, Page, PDFJS, preferThisHeight } from 'svelte-pdfjs';

	if (PDFJS.GlobalWorkerOptions) {
		// A CDN-hosted worker is already available by default
		// but you can specify a custom worker script URL.
		// Also see https://vitejs.dev/guide/assets.html#explicit-url-imports
		PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
	}

	let scale = 1;
	let num = 1;
	let file = '/tackling-ts-preview-book.pdf';
	let max_pages = 1;
	let renderTextLayer = false;
	let target_height = 500;
	let rotation: MultipleOf90 = 0;
	let show = true;
</script>

<section class="settings">
	<input type="range" step="0.25" max="4" min="1" bind:value={scale} />
	<input type="number" bind:value={num} step="1" min="1" max={max_pages} />

	<input type="radio" value="/tackling-ts-preview-book.pdf" bind:group={file} /> Doc 1
	<input type="radio" value="/impatient-js-preview-book.pdf" bind:group={file} /> Doc 2
	<input type="radio" bind:group={file} value="/yadayada.pdf" /> Doc 3 (doesn't exist)

	<input type="checkbox" bind:checked={renderTextLayer} /> Render text layer
	<input type="range" step="20" max="700" min="300" bind:value={target_height} />

	<select
		on:change={(e) => {
			// @ts-expect-error can't narrow type in the markup
			rotation = parseInt(e.currentTarget.value);
		}}
	>
		<option>0</option>
		<option>90</option>
		<option>180</option>
		<option>270</option>
	</select>
	<input type="checkbox" bind:checked={show} />
</section>

{#if show && browser}
	<Document
		file="{base}{file}"
		on:loadsuccess={(e) => console.log((max_pages = e.detail.numPages))}
		on:loaderror={console.log}
	>
		<div>
			<Page
				{scale}
				{num}
				{renderTextLayer}
				{rotation}
				getViewport={preferThisHeight(target_height)}
			/>
		</div>
	</Document>
{/if}

<style>
	div {
		display: grid;
		place-items: center;
	}
</style>
