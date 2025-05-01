import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import * as path from 'path'
// https://vitejs.dev/config/

const ReactCompilerConfig = {
	logging: 'verbose',
	dev: true
}

export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	},
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]]
			}
		}),
		svgr()
	]
})
