const esbuild = require('esbuild');

async function main() {
	const input = `
	import type { Accessor as SolidAccessor } from './solid/solid.js';
	import { createStore as solidCreateStore } from './solid/store.js';
	export { SolidAccessor, solidCreateStore };
	`
	const options = {
		target: ['es2022'],
		format: 'esm',
		platform: undefined,
		loader: 'ts',
		supported: {
			'class-static-blocks': false,
			'dynamic-import': true,
			'class-field': true
		}
	}
	const result = await esbuild.transform(input, options)
	console.log(result.code)
}

main()