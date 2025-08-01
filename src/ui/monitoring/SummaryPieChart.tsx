import { lazy, memo, Suspense } from 'react'
import { useTransformToPieChartData } from './useTransformToPieChartData'
import { PieContentFallback } from '@/shared/ui/PieChart/PieContentFallback'

const PieContent = lazy(() =>
	import('@/shared/ui/PieChart/PieContent').then(m => ({ default: m.PieContent }))
)

interface SummaryPieChartProps {
	onlineCount: number
	offlineCount: number
	totalCount: number
	chartTitle?: string
	chartDescription?: string
}

export const SummaryPieChart = memo(
	({
		onlineCount,
		offlineCount,
		totalCount,
		chartDescription,
		chartTitle
	}: SummaryPieChartProps) => {
		const pieChartData = useTransformToPieChartData({
			offline: offlineCount,
			online: onlineCount
		})

		const sectionId = 'summary-pie-chart-section'
		const chartElementTitleId = 'overall-chart-title'
		const chartElementDescriptionId = 'overall-chart-description'

		return (
			<section
				id={sectionId}
				className="h-[400px] rounded-lg border bg-slate-100 shadow-lg"
				role="region"
				aria-labelledby={chartElementTitleId}
				aria-describedby={chartElementDescriptionId}
			>
				<h2 id={chartElementTitleId} className="sr-only">
					{chartTitle || 'Estado General de Ubicaciones'}
				</h2>

				<p id={chartElementDescriptionId} className="sr-only">
					{chartDescription ||
						`Gráfico que muestra un resumen de ${onlineCount} equipos en línea y ${offlineCount} equipos fuera de línea, de un total de ${totalCount} ubicaciones.`}
				</p>
				<Suspense fallback={<PieContentFallback />}>
					<PieContent
						data={pieChartData}
						total={totalCount}
						colors={['#09713a', '#d52920']}
						dataKey="count"
						outerRadius={120}
						chartTitleId="pie-chart-main-graphic-title"
						chartDescriptionId="pie-chart-main-graphic-description"
					/>
				</Suspense>
			</section>
		)
	}
)

SummaryPieChart.displayName = 'SummaryPieChart'
