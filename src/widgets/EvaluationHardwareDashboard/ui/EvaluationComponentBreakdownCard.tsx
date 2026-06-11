import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'

const EvaluationHardwareComponentChart = lazy(() =>
	import('./EvaluationHardwareComponentChart').then(m => ({
		default: m.EvaluationHardwareComponentChart
	}))
)

export function EvaluationComponentBreakdownCard({
	summary
}: {
	summary?: EvaluationHardwareDashboardResponse['summary']
}) {
	return (
		<Card
			className="flex h-full w-full flex-col"
			role="region"
			aria-labelledby="evaluation-components-title"
			aria-describedby="evaluation-components-description"
		>
			<CardHeader>
				<CardTitle id="evaluation-components-title">
					Análisis por Componente Crítico
				</CardTitle>
				<CardDescription id="evaluation-components-description">
					Desglose detallado de compatibilidad según Procesador, Memoria RAM y
					Almacenamiento (Disco).
				</CardDescription>
			</CardHeader>
			<CardContent>
				<section className="h-100 rounded-lg border bg-slate-100 shadow-lg" role="region">
					<h2 className="sr-only">Detalle de compatibilidad por componente</h2>

					<p className="sr-only">
						Gráfico de barras que muestra el cumplimiento de requisitos técnicos
						desglosado por Procesador, Memoria RAM y Almacenamiento (Disco).
					</p>
					<Suspense fallback={<div className="h-96" />}>
						<EvaluationHardwareComponentChart summary={summary} />
					</Suspense>
				</section>
			</CardContent>
		</Card>
	)
}
