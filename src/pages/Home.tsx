import { lazy } from 'react'

const Banner = lazy(
	async () => await import('@/components/Banner').then(m => ({ default: m.Banner }))
)
const TilesSection = lazy(
	async () =>
		await import('@/components/TilesSection/TilesSection').then(m => ({
			default: m.TilesSection
		}))
)

export default function Home() {
	return (
		<>
			<Banner />
			<TilesSection />
		</>
	)
}
