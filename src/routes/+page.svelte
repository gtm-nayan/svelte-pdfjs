<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';

	import { Document, Page, preferThisHeight, type MultipleOf90 } from 'svelte-pdfjs';

	let scale = 1;
	let num = 1;
	let filename = 'tackling-ts-preview-book.pdf';
	let max_pages = 1;
	let renderTextLayer = false;
	let target_height = 500;
	let rotation: MultipleOf90 = 0;

	let sizing = 1;
</script>

<main>
	<section class="settings">
		Page <input type="number" bind:value={num} step="1" min="1" max={max_pages} /> of {max_pages}

		<select bind:value={filename}>
			<option>tackling-ts-preview-book.pdf</option>
			<option>impatient-js-preview-book.pdf</option>
			<option value="a.pdf">non existent file</option>
		</select>

		<input type="checkbox" bind:checked={renderTextLayer} /> Render text layer

		<fieldset>
			<legend>Dimensions</legend>
			<select bind:value={sizing}>
				<option value={1}>Scale: {scale}x</option>
				<option value={2}>
					Fixed height: {target_height}px
				</option>
			</select>

			{#if sizing === 2}
				<input type="range" bind:value={target_height} min="200" max="700" step="50" />
			{:else}
				<input type="range" bind:value={scale} min="0.5" max="4" step="0.25" />
			{/if}

			<label>
				Rotation
				<select bind:value={rotation}>
					<option>0</option>
					<option>90</option>
					<option>180</option>
					<option>270</option>
				</select>
			</label>
		</fieldset>
	</section>

	<div>
		{#if browser}
			<!-- {base}/ isn't neceassary if your app lives at the root of your host. 
	---- However we're serving this demo through github pages so the pdfs will
	---- be at /svelte-pdfjs/filename.pdf
	-->
			<Document
				file="{base}/{filename}"
				loadOptions={{ docBaseUrl: base }}
				on:loadsuccess={(e) => {
					max_pages = e.detail.numPages;
					num = Math.min(num, max_pages);
				}}
				on:loaderror={(e) => alert(e.detail + '')}
			>
				<Page {num} {scale} />
			</Document>
		{/if}
	</div>
</main>

<style>
	main {
		display: grid;
		height: 100vh;
		grid-template-rows: auto 1fr;
	}

	div {
		display: grid;
		place-items: center;
		position: relative;
	}

	div > :global(.container) {
		inset: 0;
	}
</style>
