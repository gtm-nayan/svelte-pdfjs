import { PDFWorker } from '@gtmnayan/pdfjs-dist-esm';
import { onDestroy, setContext } from 'svelte';
import Worker from '@gtmnayan/pdfjs-dist-esm/build/pdf.worker.js?worker';

export function set_pdfjs_context() {
	if (!import.meta.env.SSR) {
		const worker = PDFWorker.fromPort({
			port: new Worker(),
		});
		setContext('svelte_pdfjs_worker', worker);
		onDestroy(() => worker.destroy());
	}
}
