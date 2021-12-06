import { RenderingCancelledException } from "pdfjs-dist/build/pdf";

export default function (e: Error) {
	if (!(e instanceof RenderingCancelledException)){
		console.error(e)
	}
}