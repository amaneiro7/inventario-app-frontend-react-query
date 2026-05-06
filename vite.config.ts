import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	},
	plugins: [react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
	optimizeDeps: {
		include: ['recharts']
	},
	build: {
		sourcemap: true,
		commonjsOptions: {
			include: [/recharts/, /node_modules/]
		}
	}
})
