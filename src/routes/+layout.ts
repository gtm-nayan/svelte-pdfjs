import workerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { setWorkerSrc } from 'svelte-pdfjs';
setWorkerSrc(workerUrl);

export const prerender = true;
