import { lazy, Suspense } from 'react'
import { PieContentFallback } from '@/shared/ui/PieChart/PieContentFallback'
import { useEvaluationHardwareChart } from '../model/useEvaluationHardwareChart'
import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'

const PieContent = lazy(() =>
	import('@/shared/ui/PieChart/PieContent').then(m => ({ default: m.PieContent }))
)

export function EvaluationHardwarePieChart({
	summary
}: {
	summary?: EvaluationHardwareDashboardResponse['summary']
}) {
	const { apto, noApto, pieChartData, total } = useEvaluationHardwareChart({ summary })
	return (
		<section className="h-100 rounded-lg border bg-slate-100 shadow-lg" role="region">
			<h2 className="sr-only">Resumen de Aptitud de Equipos</h2>

			<p className="sr-only">
				{`Gráfico circular que muestra un resumen de ${apto} equipos aptos y ${noApto} equipos no aptos para la migración, de un total de ${total} dispositivos evaluados.`}
			</p>
			<Suspense fallback={<PieContentFallback />}>
				<PieContent
					data={pieChartData}
					total={total}
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
