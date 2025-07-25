import { lazy, Suspense } from 'react'
import { useMapChart } from '@/ui/monitoring/MapChart/useMapChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { MapChartStates } from '@/ui/monitoring/MapChart/MapChartState'
import venezuelaTopoJson from '@/ui/monitoring/MapChart/venezuelaState.json' with { type: 'json' }

const MapDisplay = lazy(() =>
	import('@/ui/monitoring/MapDisplay').then(m => ({ default: m.MapDisplay }))
)
const StateDetailsPanel = lazy(() =>
	import('@/ui/monitoring/MapChart/StateDetailsPanel').then(m => ({
		default: m.StateDetailsPanel
	}))
)

export default function MonitoringAgencyMapChart() {
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
		<Card>
			<CardHeader>
				<CardTitle>Mapa de Venezuela - Estado de Equipos por Estado</CardTitle>
				<CardDescription>
					El porcentaje representa los equipos online sobre el total en cada estado.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1fr_410px]">
				<section className="h-withoutHeader" aria-labelledby="map-title">
					<MapChartStates
						isLoading={isLoading}
						isError={isError}
						error={error}
						hasNoData={hasNoData}
					>
						<Suspense>
							<MapDisplay
								getColor={getColor}
								handleStateClick={handleStateClick}
								venezuelaGeo={venezuelaTopoJson}
								processedStateData={processedStateData}
							/>
						</Suspense>
					</MapChartStates>
				</section>
				{/* Pandel de Información */}
				<Suspense>
					<StateDetailsPanel
						selectedState={selectedState}
						stateStats={processedStateData}
					/>
				</Suspense>
			</CardContent>
		</Card>
	)
}
