import { titleLogo } from '@/shared/config'
import { LazyLogoImage } from '@/shared/ui/Images/LazyLogoImage'
import Typography from '@/shared/ui/Typography'
import { memo } from 'react'

export const LoginLogoAndTitle = memo(() => {
	return (
		<header className="border-naranja grid h-fit w-full grid-cols-[auto_1fr] items-center gap-4 border-b-8 px-4 py-6">
			<LazyLogoImage className="h-auto w-12 flex-shrink-0" width="44" height="44" />
			<Typography
				align="center"
				color="azul"
				weight="semibold"
				variant="h4"
				className="text-pretty"
			>
				Sistema Gestión de Inventario
				<br />
				{titleLogo}
			</Typography>
		</header>
	)
})

LoginLogoAndTitle.displayName = 'LoginLogoAndTitle'
