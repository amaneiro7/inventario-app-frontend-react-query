import { memo } from 'react'
import { LinkAsButton } from '@/shared/ui/Button/LinkAsButton'
import Typography from '@/shared/ui/Typography'

export const WelcomeHero = memo(() => {
	return (
		<section className="from-azul-950 to-azul-800 relative overflow-hidden rounded-xl bg-gradient-to-r">
			<div className="bg-grid-white/[0.05] absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,white)]" />
			<div className="relative px-6 py-8 text-white md:px-8 md:py-12">
				<div className="max-w-3xl">
					<Typography variant="h1" weight="bold" className="mb-2 text-2xl md:w-3xl">
						Bienvenido al Sistema de Gestión de Inventario
					</Typography>
					<Typography variant="p" className="text-azul-200 mb-6 max-w-2xl">
						Plataforma centralizada para administrar, rastrear y monitorear todos los
						equipos informáticos de la empresa. Gestiona computadoras, monitores y otros
						dispositivos en un solo lugar.
					</Typography>
					<div className="flex flex-wrap gap-3">
						<LinkAsButton
							text="Ver Dashboard"
							to="dashboard/computer"
							buttonSize="medium"
							color="orange"
						/>
						<LinkAsButton
							text="Explorar Inventario de computadoras"
							to="list/computer"
							buttonSize="medium"
							color="orange"
						/>
					</div>
				</div>
			</div>
			{/* Patrón de fondo */}
			<div className="absolute top-0 right-0 h-full w-1/3 opacity-20">
				{[...Array(6)].map((_, index) => (
					<div
						key={index}
						className="absolute rounded-full bg-white/20"
						style={{
							width: `${Math.random() * 150 + 50}px`,
							height: `${Math.random() * 150 + 50}px`,
							top: `${Math.random() * 100}%`,
							right: `${Math.random() * 100 - 50}px`
						}}
					/>
				))}
			</div>
		</section>
	)
})

WelcomeHero.displayName = 'WelcomeHero'
