import { PDFWorker } from 'pdfjs-dist';
import { onDestroy, setContext } from 'svelte';
import Worker from 'pdfjs-dist/build/pdf.worker.js?worker';

export function set_pdfjs_context() {
	if (!import.meta.env.SSR) {
		const worker = new PDFWorker({
			port: new Worker() as unknown as null,
		});
		setContext('svelte_pdfjs_worker', worker);
		onDestroy(() => worker.destroy());
	}
}
