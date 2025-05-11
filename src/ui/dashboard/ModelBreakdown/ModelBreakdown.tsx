import { lazy, memo, Suspense } from 'react'
import { useModelBreakdown } from '../hooks/useModelBreakdown'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { ModelBreakdownSelect } from './MoldeBreakdownSelect'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface ModelBreakdownProps {
	data: ComputerDashboardDto['brand']
}

const ModelBreakdownChart = lazy(() =>
	import('./ModelBreakdownChart').then(m => ({ default: m.ModelBreakdownChart }))
)

export const ModelBreakdown = memo(({ data }: ModelBreakdownProps) => {
	const { selectedBrand, barHeight, brands, dynamicHeight, modelChartData, setSelectedBrand } =
		useModelBreakdown({ data })

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Análisis de Modelos por Marca</CardTitle>
						<CardDescription>
							Distribución de modelos de equipos según la marca seleccionada
						</CardDescription>
					</div>
					<ModelBreakdownSelect
						selectedBrand={selectedBrand}
						brands={brands}
						setSelectedBrand={setSelectedBrand}
					/>
				</CardHeader>
				<CardContent style={{ height: dynamicHeight ?? '20rem', minHeight: '20rem' }}>
					<Suspense
						fallback={
							<div className="h-80 min-h-80 w-full animate-pulse bg-gray-200" />
						}
					>
						<ModelBreakdownChart
							barHeight={barHeight}
							modelChartData={modelChartData}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</div>
	)
})
