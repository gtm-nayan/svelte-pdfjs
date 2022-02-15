<script lang="ts">
	import { Document, GlobalWorkerOptions, MultipleOf90, Page, preferThisHeight } from 'svelte-pdfjs';
	import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
	import { browser } from '$app/env';

	GlobalWorkerOptions.workerSrc = workerSrc;

	let scale: number = 1;
	let num: number = 1;
	let file = '/tackling-ts-preview-book.pdf';
	let maxPages = 1;
	let renderTextLayer: boolean;
	let targetHeight = 500;
	let rotation: MultipleOf90 = 0;

	const handleSelect = (e) => {
		rotation = parseInt(e.currentTarget.value) as MultipleOf90;
	};
</script>

<section class="settings">
	<input type="range" step="0.25" max="4" min="1" bind:value={scale} />
	<input type="number" bind:value={num} step="1" min="1" max={maxPages} />

	<input type="radio" value="/tackling-ts-preview-book.pdf" bind:group={file} /> Doc 1
	<input type="radio" value="/impatient-js-preview-book.pdf" bind:group={file} /> Doc 2
	<input type="radio" bind:group={file} value="/yadayada.pdf" /> Doc 3 (doesn't exist)

	<input type="checkbox" bind:checked={renderTextLayer} /> Render text layer
	<input type="range" step="20" max="700" min="300" bind:value={targetHeight} />
	<select on:change={handleSelect}>
		<option>0</option>
		<option>90</option>
		<option>180</option>
		<option>270</option>
	</select>
</section>

{#if browser}
	<Document
		{file}
		on:loadsuccess={(e) => console.log((maxPages = e.detail.numPages))}
		on:loaderror={console.log}
	>
		<div>
			<Page
				{scale}
				{num}
				{renderTextLayer}
				{rotation}
				getViewport={preferThisHeight(targetHeight)}
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
