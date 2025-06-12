import { memo, useMemo } from 'react'
import { useGetLocationMonitoringDashboardByState } from '@/core/locations/locationMonitoring/infra/hook/useGetLocationMonitoringDashboardByState'
import { LocationMonitoringStatuses } from '@/core/locations/locationMonitoring/domain/value-object/LocationMonitoringStatus'
import { PieCard } from '@/ui/dashboard/PieCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { StatusProgress } from '@/ui/Home/InventoryStatus/StatusProgress'
import Typography from '@/components/Typography'

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
	const pieChartData = useMemo(
		() => [
			{
				name: LocationMonitoringStatuses.ONLINE,
				count: locationMonitoringDashboardByState.online
			},
			{
				name: LocationMonitoringStatuses.OFFLINE,
				count: locationMonitoringDashboardByState.offline
			}
		],
		[locationMonitoringDashboardByState.offline, locationMonitoringDashboardByState.online]
	)
	return (
		<div className="grid h-full max-h-screen grid-cols-1 gap-6 lg:grid-cols-3">
			<PieCard
				className="lg:col-span-2"
				data={pieChartData}
				dataKey="count"
				total={locationMonitoringDashboardByState.total}
				title="Estado General de ubicaciones"
				desc="Visión general de ubicaciones activos e inactivos en la red."
				colors={['#09713a', '#d52920']}
			/>
			<Card className="h-full md:min-h-[560px]">
				<CardHeader>
					<CardTitle>Estado de ubicaciones por Estado</CardTitle>
					<CardDescription>
						Distribución de ubicaciones activos e inactivos por estado geográfico.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{locationMonitoringDashboardByState.byState &&
					locationMonitoringDashboardByState.byState.length > 0 ? (
						locationMonitoringDashboardByState.byState.map(location => (
							<StatusProgress
								key={location.stateName}
								label={location.stateName}
								total={location.total}
								value={location.onlineCount}
								indicatorColor="bg-verde"
							/>
						))
					) : (
						<div className="flex h-full items-center justify-center">
							<Typography variant="p" color="gris">
								No hay datos de ubicaciones por estado disponibles.
							</Typography>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
})

LocationMonitoringChart.displayName = 'LocationMonitoringChart'

// Placeholder for a more engaging loading component
export const LoadingSpinner = () => (
	<div className="flex h-full min-h-[300px] items-center justify-center">
		<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900 dark:border-gray-100"></div>
		<p className="ml-4 text-gray-700 dark:text-gray-300">
			Cargando datos del monitoreo de ubicaciones...
		</p>
	</div>
)
