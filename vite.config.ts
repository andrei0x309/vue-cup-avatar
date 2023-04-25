import path from 'node:path'
import Components from 'unplugin-vue-components/vite'
// import fonts from 'vite-plugin-fonts'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
// import typescript2 from 'rollup-plugin-typescript2'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		vue(),
		Components({
			dts: true,
		}),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), 'src/icons')],
			symbolId: '[dir]:[name]',
		}),
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/main.ts'),
			name: 'VACropper',
			fileName: (format) => `vue-cup-avatar.${format}.js`,
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
})
