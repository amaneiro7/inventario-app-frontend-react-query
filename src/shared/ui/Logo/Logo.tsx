import { lazy, memo } from 'react'
import { Link } from 'react-router-dom'
import { titleLogo } from '@/shared/config'
import { cn } from '@/shared/lib/utils'
import './Logo.css'

const LazyLogoImage = lazy(() =>
	import('../Images/LazyLogoImage').then(m => ({ default: m.LazyLogoImage }))
)
const LazyWhiteLogoImage = lazy(() =>
	import('../Images/LazyWhiteLogoImage').then(m => ({ default: m.LazyWhiteLogoImage }))
)

const Logo = memo(({ dark = false }: { dark?: boolean }) => {
	return (
		<Link
			className="mx-auto"
			aria-label="Logo"
			aria-describedby="Logo y un enlace al inicio de la página"
			to="/"
		>
			<div
				className={cn(
					'Logo flex items-center gap-2 md:divide-x-2',
					dark ? 'divide-white' : 'divide-azul-900'
				)}
			>
				{dark ? (
					<LazyWhiteLogoImage
						className="clear-none w-11 max-w-11 bg-contain pr-1"
						width="44"
						height="44"
					/>
				) : (
					<LazyLogoImage
						className="clear-none w-11 max-w-11 bg-contain pr-1"
						width="44"
						height="44"
					/>
				)}
				<h1
					className={cn(
						'hidden flex-col pl-2 font-semibold md:flex',
						dark ? 'text-white' : 'text-azul'
					)}
				>
					Soporte Tecnico
					<span
						className={cn(dark ? 'text-white' : 'text-azul-950/80')}
					>{`${titleLogo}`}</span>
				</h1>
			</div>
		</Link>
	)
})

export default Logo
