import { vitePreprocess } from '@sveltejs/kit/vite';
import { default as adapter } from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter({
			precompress: true,
		}),

		alias: {
			'svelte-pdfjs': 'src/lib/index.js',
			'svelte-pdfjs/*': 'src/lib/*',
		},

		paths: {
			base: process.env.BASE_PATH,
		},
	},
};

export default config;
