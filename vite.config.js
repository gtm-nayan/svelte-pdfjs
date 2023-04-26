import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import { builtinModules } from 'node:module';

export default defineConfig({
	plugins: [sveltekit()],

	resolve: {
		alias: {
			'svelte-pdfjs': path.resolve('src/lib'),
		},
	},
	build: {
		rollupOptions: {
			external: ['canvas', ...builtinModules],
		},
	},
});
