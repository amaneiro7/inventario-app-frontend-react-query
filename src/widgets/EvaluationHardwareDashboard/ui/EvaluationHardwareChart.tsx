import { lazy, memo, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'

const EvaluationHardwarePieChart = lazy(() =>
	import('./EvaluationHardwarePieChart').then(m => ({ default: m.EvaluationHardwarePieChart }))
)

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

		const cardTitleId = 'evaluation-hardware-chart-title'
		const cardDescriptionId = 'evaluation-hardware-chart-description'

		return (
			<Card
				className="flex h-full w-full flex-col"
				role="region"
				aria-labelledby={cardTitleId}
				aria-describedby={cardDescriptionId}
			>
				<CardHeader>
					<CardTitle id={cardTitleId}>
						Compatibilidad de Hardware para Migración
					</CardTitle>
					<CardDescription id={cardDescriptionId}>
						Estado de los equipos pendientes por actualizar a Windows 10/11 según
						requisitos técnicos.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1fr_400px]">
					<Suspense fallback={<div className="min-h-96" />}>
						<EvaluationHardwarePieChart summary={summary} />
					</Suspense>
				</CardContent>
			</Card>
		)
	}
)

EvaluationHardwareChart.displayName = 'EvaluationHardwareChart'
