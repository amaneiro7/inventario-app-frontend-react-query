import { lazy, memo } from 'react'

const LazyBannerImage = lazy(async () =>
	import('@/components/Images/LazyBannerImage').then(m => ({ default: m.LazyBannerImage }))
)

export const Banner = memo(() => {
	return (
		<section className="relative w-full min-w-full h-52 bg-secondary-900">
			<LazyBannerImage className="w-full h-full bg-no-repeat bg-cover" />

			<h2
				style={{ textShadow: '0 1px 2px black' }}
				className="text-4xl font-bold text-white absolute bottom-2 pl-8 drop-shadow-md"
			>
				Aplicacion de Inventarios
			</h2>
		</section>
	)
})

Banner.displayName = 'Banner'
