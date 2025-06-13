import { lazy, memo, Suspense } from 'react'
import { useMapChart } from './useMapChart'
import venezuelaTopoJson from './venezuelaState.json' with { type: 'json' }

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { MapChartStates } from './MapChartState'

const MapDisplay = lazy(() =>
	import('@/ui/monitoring/MapDisplay').then(m => ({ default: m.MapDisplay }))
)
const StateDetailsPanel = lazy(() =>
	import('./StateDetailsPanel').then(m => ({ default: m.StateDetailsPanel }))
)

export const MapChart = memo(() => {
	const {
		locationMonitoringDashboardByState,
		isError,
		isLoading,
		error,
		getColor,
		handleStateClick,
		selectedState,
		processedStateData
	} = useMapChart()

	const hasNoData =
		!locationMonitoringDashboardByState ||
		locationMonitoringDashboardByState.byState.length === 0

	return (
		<div className="grid grid-cols-1 gap-6 overflow-hidden lg:grid-cols-3">
			<Card className="lg:col-span-2">
				<CardHeader>
					<CardTitle>Mapa de Venezuela - Estado de Equipos por Estado</CardTitle>
					<CardDescription>
						El porcentaje representa los equipos online sobre el total en cada estado.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex max-h-3/6 flex-col">
					<MapChartStates
						isLoading={isLoading}
						isError={isError}
						error={error}
						hasNoData={hasNoData}
					>
						<MapDisplay
							getColor={getColor}
							handleStateClick={handleStateClick}
							venezuelaGeo={venezuelaTopoJson}
							processedStateData={processedStateData}
						/>
					</MapChartStates>
				</CardContent>
			</Card>
			{/* Pandel de Información */}
			<Suspense>
				<StateDetailsPanel selectedState={selectedState} stateStats={processedStateData} />
			</Suspense>
		</div>
	)
})

MapChart.displayName = 'MapChart'
