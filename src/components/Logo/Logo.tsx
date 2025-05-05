import { lazy, memo } from 'react'
import { Link } from 'react-router-dom'
import { titleLogo } from '@/config'
import './Logo.css'

const LazyLogoImage = lazy(async () =>
	import('../Images/LazyLogoImage').then(m => ({ default: m.LazyLogoImage }))
)

const Logo = memo(() => {
	return (
		<Link
			className="mx-auto"
			aria-label="Logo"
			aria-describedby="Logo y un enlace al inicio de la página"
			to="/"
		>
			<div className="Logo divide-azul-900 flex items-center gap-2 md:divide-x-2">
				<LazyLogoImage
					className="clear-none w-11 max-w-11 bg-contain pr-1"
					width="44"
					height="44"
				/>
				<h1 className="text-azul hidden flex-col pl-2 font-semibold md:flex dark:text-white">
					Soporte Tecnico
					<span className="text-azul-950/80">{`${titleLogo}`}</span>
				</h1>
			</div>
		</Link>
	)
})

export default Logo
