import { memo } from 'react'
import Typography from '../Typography'

export const Footer = memo(() => {
	return (
		<footer className="flex h-8 min-h-8 w-full justify-center bg-slate-700 p-2">
			<Typography color="white" variant="p" option="small" align="center">
				{`Hecho por Andres Maneiro, amaneiro7@gmail.com - Copyright © InventarioAPP 2024-${new Date().getFullYear()}.`}
			</Typography>
			<span aria-hidden className="bg-gris h-0 w-0 rounded-full" />
			<span aria-hidden className="bg-amarillo h-0 w-0 rounded-full" />
		</footer>
	)
})
