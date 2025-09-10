import { lazy, memo, Suspense } from 'react'
import { useMapChart } from '@/widgets/monitoring/MapChart/Model/useMapChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { MapChartStates } from '@/widgets/monitoring/MapChart/ui/MapChartState'
import { useVenezuelaTopoJson } from '../utils/useVenezuelaTopoJson'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { StateDetailsPanelSkeleton } from './StateDetailsPanelSkeleton'
import { MapChartSkeleton } from './MapChartSkeleton'

const StateDetailsPanel = lazy(() =>
	import('@/widgets/monitoring/MapChart/ui/StateDetailsPanel').then(m => ({
		default: m.StateDetailsPanel
	}))
)
const VenezuelaMap = lazy(() => import('./VenezuelaMap').then(m => ({ default: m.VenezuelaMap })))

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
						{venezuelaTopoJson && (
							<Suspense fallback={<MapChartSkeleton />}>
								<VenezuelaMap
									getColor={getColor}
									handleStateClick={handleStateClick}
									venezuelaGeo={venezuelaTopoJson}
									processedStateData={processedStateData}
								/>
							</Suspense>
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
					<Suspense fallback={<StateDetailsPanelSkeleton />}>
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
