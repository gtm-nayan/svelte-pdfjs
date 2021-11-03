<script>
	import PdfViewer from '$lib/index.svelte';

	let showPdf = true;
	let page = 1;
	let doc_url = '9700_s12_qp_12.pdf';
</script>

{#if showPdf}
	<PdfViewer pdfUrl="https://quillpdfs.netlify.app/{doc_url}" pageNumber={page}/>
{/if}
<div>
	<input type="checkbox" bind:checked={showPdf} />
	<input type="number" min={1} max={6} bind:value={page} />

	<select bind:value={doc_url}>
		<option>9700_s12_qp_11.pdf</option>
		<option>9700_s12_qp_12.pdf</option>
		<option>9700_s12_qp_13.pdf</option>
	</select>
</div>
