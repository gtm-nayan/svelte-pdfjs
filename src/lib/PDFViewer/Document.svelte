<script lang="ts">
	import type {
		DocumentInitParameters,
		OnProgressParameters
	} from 'pdfjs-dist/types/src/display/api';
	import { onMount } from 'svelte';

	export let file: string | URL = undefined;
	export let loadOptions: DocumentInitParameters = undefined;
	export let onProgress: (params: OnProgressParameters) => void = undefined;

	let InternalDocumentComponent;

	onMount(async () => {
		InternalDocumentComponent = (await import('./DocumentInternal.svelte')).default;
	});
</script>

<svelte:component this={InternalDocumentComponent} {file} {loadOptions} {onProgress}>
	<slot />
</svelte:component>
