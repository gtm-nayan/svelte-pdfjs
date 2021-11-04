export default function (e: Error) {
	if (e.name != "RenderingCancelledException"){
		console.error(e)
	}
}