import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'

const EvaluationHardwarePieChart = lazy(() =>
	import('./EvaluationHardwarePieChart').then(m => ({ default: m.EvaluationHardwarePieChart }))
)

export function EvaluationGeneralSummaryCard({
	summary
}: {
	summary?: EvaluationHardwareDashboardResponse['summary']
}) {
	return (
		<Card
			className="flex h-full w-full flex-col"
			role="region"
			aria-labelledby="evaluation-pie-title"
			aria-describedby="evaluation-pie-description"
		>
			<CardHeader>
				<CardTitle id="evaluation-pie-title">Resumen de Aptitud General</CardTitle>
				<CardDescription id="evaluation-pie-description">
					Distribución global de equipos que cumplen con los requisitos mínimos para la
					actualización a Windows 10/11.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<div className="h-96" />}>
					<EvaluationHardwarePieChart summary={summary} />
				</Suspense>
			</CardContent>
		</Card>
	)
}
