import { lazy } from 'react'
import { navigation } from '@/routes/navigation'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

const TilesContainer = lazy(
	async () =>
		await import('@/components/TilesSection/TilesContainer').then(m => ({
			default: m.TilesContainer
		}))
)
const TilesBox = lazy(
	async () =>
		await import('@/components/TilesSection/TilesBox').then(m => ({ default: m.TilesBox }))
)
const TilesInvisible = lazy(
	async () =>
		await import('@/components/TilesSection/TilesInvisible').then(m => ({
			default: m.TilesInvisible
		}))
)
const TilesInvisibleInfo = lazy(
	async () =>
		await import('@/components/TilesSection/TilesInvisibleInfo').then(m => ({
			default: m.TilesInvisibleInfo
		}))
)
const TilesVisible = lazy(
	async () =>
		await import('@/components/TilesSection/TilesVisible').then(m => ({
			default: m.TilesVisible
		}))
)

export function TilesSection({ ...props }: Props) {
	return (
		<section {...props} className="w-full flex justify-center py-8 select-none">
			<TilesContainer>
				{navigation.map((nav, index) => (
					<TilesBox img={nav.img} key={nav.label}>
						<TilesInvisible>
							{nav.navs.map(info => (
								<TilesInvisibleInfo
									key={info.path}
									label={info.title}
									url={info.path}
								/>
							))}
						</TilesInvisible>
						<TilesVisible isPar={index} desc={nav.desc} title={nav.label} />
					</TilesBox>
				))}
			</TilesContainer>
		</section>
	)
}
