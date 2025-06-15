import { memo } from 'react'
import { useGetLocationMonitoringDashboardByState } from '@/core/locations/locationMonitoring/infra/hook/useGetLocationMonitoringDashboardByState'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { LocationsByStateList } from './LocationByStateList'
import { LocationSummaryPieChart } from './LocationSummaryPieChart'

// Placeholder for a more engaging loading component
export const LoadingSpinner = () => (
	<div className="flex h-full min-h-[300px] items-center justify-center">
		<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900 dark:border-gray-100"></div>
		<p className="ml-4 text-gray-700 dark:text-gray-300">
			Cargando datos del monitoreo de ubicaciones...
		</p>
	</div>
)

export const LocationMonitoringChart = memo(() => {
	const { locationMonitoringDashboardByState, isError, isLoading, error } =
		useGetLocationMonitoringDashboardByState()
	if (isLoading || !locationMonitoringDashboardByState) {
		return <LoadingSpinner />
	}

	if (isError) {
		return (
			<div className="text-rojo-600 flex h-full min-h-[300px] items-center justify-center">
				<p>Error al cargar los datos: {error?.message}</p>
			</div>
		)
	}

	const { online, offline, total, byState } = locationMonitoringDashboardByState

	return (
		<Card>
			<CardHeader>
				<CardTitle>Estado General de ubicaciones</CardTitle>
				<CardDescription>
					Visión general de ubicaciones activos e inactivos en la red.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1fr_400px]">
				{/* Left side: Pie Chart for overall summary */}
				<LocationSummaryPieChart
					onlineCount={online}
					offlineCount={offline}
					totalCount={total}
				/>

				{/* Right side: List of locations by state */}
				<LocationsByStateList statesData={byState} />
			</CardContent>
		</Card>
	)
})

LocationMonitoringChart.displayName = 'LocationMonitoringChart'
