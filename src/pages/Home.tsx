import { InventoryDistribution } from '@/ui/Home/InventoryDistribution'
import { InventoryStatus } from '@/ui/Home/InventoryStatus'
import { InventorySummary } from '@/ui/Home/InventorySummary'
import { QuickActions } from '@/ui/Home/QuickAccess'
import { RecentActivities } from '@/ui/Home/RecentActivities'
import { WelcomeHero } from '@/ui/Home/WelcomeHero'
import { Suspense } from 'react'

export default function Home() {
	return (
		<div className="mb-6 space-y-6">
			<WelcomeHero />
			<InventorySummary />
			<QuickActions />
			<div className="fade-in grid grid-cols-1 gap-6 lg:grid-cols-2">
				<RecentActivities />
			</div>
			<div className="fade-in grid grid-cols-1 gap-6 lg:grid-cols-2">
				<InventoryStatus />
				<Suspense fallback={<div className="animate-pulse-medium min-h-[710px] w-full" />}>
					<InventoryDistribution />
				</Suspense>
			</div>
		</div>
	)
}
