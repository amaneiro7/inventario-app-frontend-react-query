import { lazy, Suspense } from 'react'
import Typography from '@/shared/ui/Typography'
import { WelcomeHero } from '@/ui/Home/WelcomeHero'
import { InventorySummary } from '@/ui/Home/InventorySummary'
import { QuickActions } from '@/ui/Home/QuickAccess'

const InventoryChart = lazy(() =>
	import('@/ui/Home/InventoryChart').then(m => ({ default: m.InventoryChart }))
)
const InventoryDistribution = lazy(() =>
	import('@/ui/Home/InventoryDistribution').then(m => ({ default: m.InventoryDistribution }))
)
const InventoryStatus = lazy(() =>
	import('@/ui/Home/InventoryStatus').then(m => ({ default: m.InventoryStatus }))
)
const RecentActivities = lazy(() =>
	import('@/ui/Home/RecentActivities').then(m => ({ default: m.RecentActivities }))
)

export default function Home() {
	return (
		<div className="mb-6 space-y-6">
			<WelcomeHero />
			<section className="fade-in">
				<Typography variant="h2" weight="semibold" className="mb-4">
					Resumen de inventario
				</Typography>
				<InventorySummary />
			</section>
			<QuickActions />
			<div className="fade-in grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Suspense
					fallback={
						<div className="animate-pulse-medium min-h-[560px] w-full bg-gray-200" />
					}
				>
					<InventoryChart />
				</Suspense>
				<Suspense
					fallback={
						<div className="animate-pulse-medium min-h-[560px] w-full bg-gray-200" />
					}
				>
					<RecentActivities />
				</Suspense>
			</div>
			<div className="fade-in grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Suspense
					fallback={
						<div className="animate-pulse-medium min-h-[560px] w-full bg-gray-200" />
					}
				>
					<InventoryStatus />
				</Suspense>
				<Suspense
					fallback={
						<div className="animate-pulse-medium min-h-[560px] w-full bg-gray-200" />
					}
				>
					<InventoryDistribution />
				</Suspense>
			</div>
		</div>
	)
}
