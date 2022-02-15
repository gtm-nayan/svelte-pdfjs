export { default as Document } from './PDFViewer/Document.svelte';
export { default as Page } from './PDFViewer/Page.svelte';
export * from './utils/target_dimension.js';

import { GlobalWorkerOptions, version } from 'pdfjs-dist/lib/pdf.js';
GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.js`;
export { GlobalWorkerOptions };