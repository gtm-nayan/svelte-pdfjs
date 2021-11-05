<script>
	import PdfViewer from '$lib/index.svelte';

	let showPdf = true;
	let page = 1;
	let doc_url = 'tackling-ts-preview-book.pdf';
	let zoom = 1;
	let max_pages = 1;
</script>

<br />

{#if showPdf}
	<PdfViewer
		pdfUrl="/{doc_url}"
		pageNumber={page}
		zoomLevel={zoom}
		on:documentloaded={(e) => (max_pages = e.detail.numPages)}
	/>
{/if}

<div>
	<input type="checkbox" bind:checked={showPdf} />
	<input type="number" min={1} max={max_pages} bind:value={page} />
	<input type="range" min={0.25} max={4} step={0.25} bind:value={zoom} />

	<select bind:value={doc_url}>
		<option>impatient-js-preview-book.pdf</option>
		<option>tackling-ts-preview-book.pdf</option>
	</select>

	<button
		on:click={() => {
			doc_url = 'impatient-js-preview-book.pdf';
			page = 5;
		}}
	>
		Test switching both page and url
	</button>
</div>
<br />
Demo PDFs sourced from https://exploringjs.com/
