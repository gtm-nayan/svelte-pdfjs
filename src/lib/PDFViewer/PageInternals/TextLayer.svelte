<script lang="ts">
	import * as PDFJS from 'pdfjs-dist';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';

	export let page: PDFJS.PDFPageProxy;
	export let viewport: PageViewport;

	let render_task: ReturnType<typeof PDFJS.renderTextLayer>;
	let container: HTMLDivElement;

	function render_text_layer() {
		render_task?.cancel();
		container.innerHTML = '';
		render_task = PDFJS.renderTextLayer({
			container,
			textContentStream: page.streamTextContent(),
			viewport,
		});
	}

	$: if (container && viewport) render_text_layer();
</script>

<div bind:this={container} />

<style>
	div {
		position: absolute;
		inset: 0;
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
