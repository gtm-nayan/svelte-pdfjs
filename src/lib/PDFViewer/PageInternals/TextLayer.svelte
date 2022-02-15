<script lang="ts">
	import type { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
	import * as PDFJS from 'pdfjs-dist/lib/pdf.js';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';
	import type { renderTextLayer } from 'pdfjs-dist/lib/pdf.js';

	export let page: PDFPageProxy;
	export let viewport: PageViewport;

	let renderTask: ReturnType<typeof renderTextLayer>;
	let container: HTMLDivElement;

	async function render() {
		const textContent = await page.getTextContent();
		renderTask?.cancel();
		container.innerHTML = '';
		renderTask = PDFJS.renderTextLayer({
			container,
			textContent,
			viewport,
			enhanceTextSelection: true,
		});
	}

	$: if (viewport) render();
</script>

<div bind:this={container} />

<style>
	div {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: hidden;
		opacity: 0.2;
		line-height: 1;
	}

	div > :global(span) {
		color: transparent;
		position: absolute;
		white-space: pre;
		cursor: text;
		transform-origin: 0% 0%;
	}
</style>
