<script lang="ts">
	import * as PDFJS from 'pdfjs-dist';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';

	export let page: PDFJS.PDFPageProxy;
	export let viewport: PageViewport;

	let render_task: ReturnType<typeof PDFJS.renderTextLayer>;
	let container: HTMLDivElement;

	// Passing container into the function will prevent svelte from creating an invalidate call
	function render_text_layer(_container: typeof container) {
		render_task?.cancel();
		_container.innerHTML = '';
		render_task = PDFJS.renderTextLayer({
			container,
			textContentStream: page.streamTextContent(),
			viewport,
		});
	}

	$: if (container && viewport) render_text_layer(container);
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
