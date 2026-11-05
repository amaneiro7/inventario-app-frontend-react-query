import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(import.meta.dirname, 'src')
			}
		]
	},
	plugins: [react({ compiler: true }), svgr()],
	optimizeDeps: {
		include: ['recharts', 'd3-scale', 'd3-interpolate', 'd3-shape']
	},
	build: {
		sourcemap: true,
		commonjsOptions: {
			include: [/recharts/, /node_modules/]
		}
	}
})
