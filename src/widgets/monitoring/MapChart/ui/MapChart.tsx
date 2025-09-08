import { lazy, memo, Suspense } from 'react'
import { useMapChart } from '@/widgets/monitoring/MapChart/Model/useMapChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { MapChartStates } from '@/widgets/monitoring/MapChart/ui/MapChartState'
import { useVenezuelaTopoJson } from '../utils/useVenezuelaTopoJson'
import { VenezuelaMap } from './VenezuelaMap'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

/**
 * Lazily loaded component for displaying details of a selected state.
 */
const StateDetailsPanel = lazy(() =>
	import('@/widgets/monitoring/MapChart/ui/StateDetailsPanel').then(m => ({
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

	const {
		data: venezuelaTopoJson,
		loading: topoJsonLoading,
		error: topoJsonError
	} = useVenezuelaTopoJson()

	// Determine if there is no data to display for the map.
	const hasNoData =
		!locationMonitoringDashboardByState ||
		locationMonitoringDashboardByState.byState.length === 0

	return (
		<Card>
			<CardHeader>
				<CardTitle id="map-title">
					Mapa de Venezuela - Estado de Equipos por Estado
				</CardTitle>
				<CardDescription>
					El porcentaje representa los equipos online sobre el total de equipos
					registrados en cada estado.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1fr_410px]">
				{/* Section for the main map display */}
				<section className="h-withoutHeader" aria-labelledby="map-title">
					<MapChartStates
						isLoading={isLoading || topoJsonLoading}
						isError={isError || !!topoJsonError}
						error={error || topoJsonError}
						hasNoData={hasNoData}
					>
						{/* Suspense boundary for the lazily loaded VenezuelaMap component */}

						{venezuelaTopoJson && (
							<VenezuelaMap
								getColor={getColor}
								handleStateClick={handleStateClick}
								venezuelaGeo={venezuelaTopoJson}
								processedStateData={processedStateData}
							/>
						)}
					</MapChartStates>
				</section>
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							onReset={onReset}
							variant="default"
							message="No se pudo cargar los datos."
						/>
					)}
				>
					<Suspense fallback={<div>Cargando detalles del estado...</div>}>
						<StateDetailsPanel
							selectedState={selectedState}
							stateStats={processedStateData}
						/>
					</Suspense>
				</ErrorBoundary>
			</CardContent>
		</Card>
	)
})

MapChart.displayName = 'MapChart'
