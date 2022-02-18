<script lang="ts">
	import type { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
	import * as PDFJS from 'pdfjs-dist';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';

	export let page: PDFPageProxy;
	export let viewport: PageViewport;

	let render_task: ReturnType<typeof PDFJS.renderTextLayer>;
	let container: HTMLDivElement;

	// Has to be concealed in a function to avoid infinite loops
	function clear_container(_container: HTMLDivElement) {
		_container.innerHTML = '';
	}

	async function render_text_layer() {
		const textContent = await page.getTextContent();
		render_task?.cancel();

		clear_container(container);
		render_task = PDFJS.renderTextLayer({
			container,
			textContent,
			viewport,
			enhanceTextSelection: true,
		});
	}

	$: if (viewport && container) render_text_layer();
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
