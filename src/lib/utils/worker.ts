import { readable } from 'svelte/store';
import * as PDFJS from 'pdfjs-dist';

const gw_opts = PDFJS.GlobalWorkerOptions;
const orig_src = gw_opts?.workerSrc;

let worker_src =
	orig_src ?? `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS.version}/build/pdf.worker.min.js`;

export function set_worker_src(url: string) {
	worker_src = url;
}

export const PDFWorker = readable<PDFJS.PDFWorker>(undefined, (set) => {
	gw_opts.workerSrc = worker_src;
	const worker = new PDFJS.PDFWorker();
	gw_opts.workerSrc = orig_src;
	set(worker);

	return () => worker.destroy();
});
