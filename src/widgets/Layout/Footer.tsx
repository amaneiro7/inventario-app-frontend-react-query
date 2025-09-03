import { memo } from 'react'
import Typography from '../../shared/ui/Typography'

export const Footer = memo(() => {
	return (
		<footer className="flex h-auto min-h-8 w-full items-center justify-center bg-slate-700 p-2 text-center">
			<Typography color="white" variant="p" option="small" align="center">
				Hecho por Andres Maneiro, amaneiro7@gmail.com
				<br className="sm:hidden" />
				{` - Copyright © InventarioAPP 2024-${new Date().getFullYear()}.`}
			</Typography>
			<span aria-hidden className="bg-gris h-0 w-0 rounded-full" />
			<span aria-hidden className="bg-amarillo h-0 w-0 rounded-full" />
		</footer>
	)
})
