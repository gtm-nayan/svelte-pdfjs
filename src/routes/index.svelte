<script>
	import PDFViewer from '$lib';

	let showPdf = true;
	let page = 1;
	let doc_url = 'tackling-ts-preview-book.pdf';
	let zoom = 1;
	let max_pages = 1;
	let loadprogress = 0;
</script>

<br />

{loadprogress}%
<br />
{#if showPdf}
	<PDFViewer
		pdfUrl="/{doc_url}"
		pageNumber={page}
		zoomLevel={zoom}
		on:documentloaded={(e) => (max_pages = e.detail.numPages)}
		progressCallback={({ loaded, total }) => (loadprogress = (loaded / total) * 100)}
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
</div>
<br />
Demo PDFs sourced from <a href="https://exploringjs.com/">https://exploringjs.com/</a>
