import { lazy, Suspense } from 'react'
import { useMapChart } from '@/ui/monitoring/MapChart/useMapChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { MapChartStates } from '@/ui/monitoring/MapChart/MapChartState'
import venezuelaTopoJson from '@/ui/monitoring/MapChart/venezuelaState.json' with { type: 'json' }

/**
 * Lazily loaded component for displaying the map.
 */
const MapDisplay = lazy(() =>
	import('@/ui/monitoring/MapDisplay').then(m => ({ default: m.MapDisplay }))
)

/**
 * Lazily loaded component for displaying details of a selected state.
 */
const StateDetailsPanel = lazy(() =>
	import('@/ui/monitoring/MapChart/StateDetailsPanel').then(m => ({
		default: m.StateDetailsPanel
	}))
)

/**
 * MonitoringAgencyMapChart Component
 *
 * This page component displays a geographical map of Venezuela, visualizing the status
 * of equipment across different states. It fetches monitoring data using the `useMapChart` hook
 * and presents it on an interactive map, along with a panel for detailed state statistics.
 *
 * Key Features:
 * - Displays equipment online percentage per state.
 * - Allows interaction (clicking) with states to view detailed information.
 * - Utilizes lazy loading for map and details panel components to optimize initial load times.
 * - Provides loading, error, and no-data states for a robust user experience.
 */
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

	// Determine if there is no data to display for the map.
	const hasNoData =
		!locationMonitoringDashboardByState ||
		locationMonitoringDashboardByState.byState.length === 0

	return (
		<Card>
			<CardHeader>
				<CardTitle id="map-title">Mapa de Venezuela - Estado de Equipos por Estado</CardTitle>
				<CardDescription>
					El porcentaje representa los equipos online sobre el total de equipos registrados en cada estado.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1fr_410px]">
				{/* Section for the main map display */}
				<section className="h-withoutHeader" aria-labelledby="map-title">
					<MapChartStates
						isLoading={isLoading}
						isError={isError}
						error={error}
						hasNoData={hasNoData}
					>
						{/* Suspense boundary for the lazily loaded MapDisplay component */}
						<Suspense fallback={<div>Cargando mapa...</div>}>
							<MapDisplay
								getColor={getColor}
								handleStateClick={handleStateClick}
								venezuelaGeo={venezuelaTopoJson}
								processedStateData={processedStateData}
							/>
						</Suspense>
					</MapChartStates>
				</section>
				{/* Panel de Información - Suspense boundary for the lazily loaded StateDetailsPanel component */}
				<Suspense fallback={<div>Cargando detalles del estado...</div>}>
					<StateDetailsPanel
						selectedState={selectedState}
						stateStats={processedStateData}
					/>
				</Suspense>
			</CardContent>
		</Card>
	)
}
