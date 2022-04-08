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

	let sizing = 1;
</script>

<section class="settings">
	<input type="number" bind:value={num} step="1" min="1" max={max_pages} />

	<input type="radio" value="/tackling-ts-preview-book.pdf" bind:group={file} /> Doc 1
	<input type="radio" value="/impatient-js-preview-book.pdf" bind:group={file} /> Doc 2
	<input type="radio" bind:group={file} value="/yadayada.pdf" /> Doc 3 (doesn't exist)

	<input type="checkbox" bind:checked={renderTextLayer} /> Render text layer

	<fieldset>
		<legend>Dimensions</legend>
		<select bind:value={sizing}>
			<option value={1}>Scale: {scale}x</option>
			<option value={2}>
				Fixed height: {target_height}px
			</option>
		</select>

		{#if sizing === 2}
			<input type="range" bind:value={target_height} min="200" max="700" step="50" />
		{:else}
			<input type="range" bind:value={scale} min="0.5" max="4" step="0.25" />
		{/if}

		<label>
			Rotation
			<select bind:value={rotation}>
				<option>0</option>
				<option>90</option>
				<option>180</option>
				<option>270</option>
			</select>
		</label>
	</fieldset>
</section>

{#if browser}
	<Document
		{file}
		loadOptions={{ docBaseUrl: base }}
		on:loadsuccess={(e) => console.log((max_pages = e.detail.numPages))}
		on:loaderror={console.log}
	>
		<div>
			<Page
				{scale}
				{num}
				{renderTextLayer}
				{rotation}
				getViewport={sizing === 1 ? undefined : preferThisHeight(target_height)}
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
