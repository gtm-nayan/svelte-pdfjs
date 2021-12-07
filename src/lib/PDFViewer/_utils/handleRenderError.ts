import { RenderingCancelledException } from 'pdfjs-dist/build/pdf';

export default function (e: Error): void {
	if (!(e instanceof RenderingCancelledException)) {
		console.error(e.message);
	}
}
