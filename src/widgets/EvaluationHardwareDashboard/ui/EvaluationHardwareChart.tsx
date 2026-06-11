import { lazy, memo } from 'react'
import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { EvaluationGeneralSummaryCard } from './EvaluationGeneralSummaryCard '
import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'
import { EvaluationComponentBreakdownCard } from './EvaluationComponentBreakdownCard'

const ChartErrorMessage = lazy(() =>
	import('@/shared/ui/ChartErrorMessage').then(m => ({ default: m.ChartErrorMessage }))
)

export const EvaluationHardwareChart = memo(
	({
		summary,
		error,
		isError,
		isLoading
	}: {
		summary?: EvaluationHardwareDashboardResponse['summary']
		isLoading: boolean
		isError: boolean
		error: Error | null
	}) => {
		if (isLoading) {
			return (
				<div className="flex h-96 items-center justify-center">
					<Skeleton className="h-64 w-64 rounded-full" />
				</div>
			)
		}

		if (isError) {
			return <ChartErrorMessage error={error} />
		}

		return (
			<div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4">
				{/* Gráfico Circular - Resumen General */}
				<EvaluationGeneralSummaryCard summary={summary} />

				{/* Gráfico de Barras - Desglose por Componentes */}
				<EvaluationComponentBreakdownCard summary={summary} />
			</div>
		)
	}
)

EvaluationHardwareChart.displayName = 'EvaluationHardwareChart'
