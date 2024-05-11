import { BROWSER } from 'esm-env';
import * as pdfjs from 'pdfjs-dist';
import { onDestroy, setContext } from 'svelte';

export function set_pdfjs_context() {
	if (BROWSER) {
		const worker = new pdfjs.PDFWorker({
			port: new Worker(
				new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url)
			) as unknown as null,
		});
		setContext('svelte_pdfjs_worker', worker);
		onDestroy(() => worker.destroy());
	}
}
