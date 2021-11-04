<script>
	import PdfViewer from '$lib/index.svelte';

	let showPdf = true;
	let page = 1;
	let doc_url = '9700_s12_qp_12.pdf';
	let zoom = 1;
</script>

{#if showPdf}
	<PdfViewer pdfUrl="https://quillpdfs.netlify.app/{doc_url}" pageNumber={page} zoomLevel={zoom}/>
{/if}
<div>
	<input type="checkbox" bind:checked={showPdf} />
	<input type="number" min={1} max={6} bind:value={page} />
	<input type="range" min={0.25} max={4} step={0.25} bind:value="{zoom}"/>

	<select bind:value={doc_url}>
		<option>9700_s12_qp_11.pdf</option>
		<option>9700_s12_qp_12.pdf</option>
		<option>9700_s12_qp_13.pdf</option>
	</select>
</div>
