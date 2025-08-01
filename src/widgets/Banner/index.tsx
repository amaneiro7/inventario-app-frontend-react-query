import { lazy, memo } from 'react'

const LazyBannerImage = lazy(async () =>
	import('@/shared/ui/Images/LazyBannerImage').then(m => ({ default: m.LazyBannerImage }))
)

export const Banner = memo(() => {
	return (
		<section className="bg-secondary-900 relative h-52 w-full min-w-full">
			<LazyBannerImage className="h-full w-full bg-cover bg-no-repeat" />

			<h2
				style={{ textShadow: '0 1px 2px black' }}
				className="absolute bottom-2 pl-8 text-4xl font-bold text-white drop-shadow-md"
			>
				Aplicacion de Inventarios
			</h2>
		</section>
	)
})

Banner.displayName = 'Banner'
