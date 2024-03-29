import path from 'path'
// import fonts from 'vite-plugin-fonts'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 3315,
	},
	plugins: [
		vue(),
	],
})
