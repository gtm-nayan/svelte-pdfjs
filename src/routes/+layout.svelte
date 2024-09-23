<script lang="ts">
	import { set_pdfjs_context } from 'svelte-pdfjs/utils/vite.js';
	

	set_pdfjs_context();
</script>

<slot />
