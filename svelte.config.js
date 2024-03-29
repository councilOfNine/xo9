// import adapter from '@sveltejs/adapter-netlify';
import adapter from '@sveltejs/adapter-static';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// if true, will create a Netlify Edge Function rather
		// than using standard Node-based functions
		// edge: false,

		// if true, will split your app into multiple functions
		// instead of creating a single one for the entire app.
		// if `edge` is true, this option cannot be used
		// split: false,
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: false
		})
	}
};

export default config;
