import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { MapChartStates } from '@/ui/monitoring/MapChart/MapChartState'
import { useOccSiteMapChart } from '@/ui/monitoring/mcboSiteChart/useOccSiteMapChart'

const MapDisplay = lazy(() =>
	import('@/ui/monitoring/MapDisplay').then(m => ({ default: m.MapDisplay }))
)
const StateDetailsPanel = lazy(() =>
	import('@/ui/monitoring/MapChart/StateDetailsPanel').then(m => ({
		default: m.StateDetailsPanel
	}))
)

export default function MonitoringOccSiteMapChart() {
	const {
		deviceMonitoringDashboardByLocation,
		isError,
		isLoading,
		error,
		// getColor,
		handleStateClick,
		selectedLocation,
		processedLocationDataForMap
	} = useOccSiteMapChart()

	const hasNoData =
		!deviceMonitoringDashboardByLocation || deviceMonitoringDashboardByLocation.length === 0

	console.log(processedLocationDataForMap)

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
						<Suspense></Suspense>
					</MapChartStates>
				</section>
				{/* Pandel de Información */}
				<Suspense>
					{/* <StateDetailsPanel
						selectedState={}={selectedLocation}
						stateStats={processedLocationDataForMap}
					/> */}
				</Suspense>
			</CardContent>
		</Card>
	)
}
