import { RenderingCancelledException } from "pdfjs-dist";

export default function (e: Error) {
	if (e instanceof RenderingCancelledException){
		console.error(e)
	}
}