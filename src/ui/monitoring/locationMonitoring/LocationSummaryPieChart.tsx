// src/ui/Home/LocationMonitoring/LocationSummaryPieChart.tsx
import { lazy, memo, Suspense } from 'react'
import { useTransformToPieChartData } from './useTransformToPieChartData'
import { PieContentFallback } from '@/components/PieChart/PieContentFallback'

const PieContent = lazy(() =>
	import('@/components/PieChart/PieContent').then(m => ({ default: m.PieContent }))
)

interface LocationSummaryPieChartProps {
	onlineCount: number
	offlineCount: number
	totalCount: number
}

export const LocationSummaryPieChart = memo(
	({ onlineCount, offlineCount, totalCount }: LocationSummaryPieChartProps) => {
		const pieChartData = useTransformToPieChartData({
			offline: offlineCount,
			online: onlineCount
		})

		return (
			<section
				className="h-full w-full rounded-lg border bg-slate-50 shadow-xs"
				aria-labelledby="graph"
			>
				<Suspense fallback={<PieContentFallback />}>
					<PieContent
						data={pieChartData}
						total={totalCount}
						colors={['#09713a', '#d52920']}
						dataKey="count"
						outerRadius={120}
					/>
				</Suspense>
			</section>
		)
	}
)

LocationSummaryPieChart.displayName = 'LocationSummaryPieChart'
