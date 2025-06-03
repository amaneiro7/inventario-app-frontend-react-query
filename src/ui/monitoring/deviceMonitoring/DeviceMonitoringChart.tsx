import { memo, useMemo } from 'react'
import { useGetDeviceMonitoringDashboardByState } from '@/core/devices/deviceMonitoring/infra/hook/useGetDeviceMonitoringDashboardByState'
import { DeviceMonitoringStatuses } from '@/core/devices/deviceMonitoring/domain/value-object/DeviceMonitoringStatus'
import { PieCard } from '@/ui/dashboard/PieCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { StatusProgress } from '@/ui/Home/InventoryStatus/StatusProgress'
import Typography from '@/components/Typography'

export const DeviceMonitoringChart = memo(() => {
	const { deviceMonitoringDashboardByState, isError, isLoading, error } =
		useGetDeviceMonitoringDashboardByState()
	if (isLoading || !deviceMonitoringDashboardByState) {
		return <LoadingSpinner />
	}

	if (isError) {
		return (
			<div className="flex h-full min-h-[300px] items-center justify-center text-red-600">
				<p>Error al cargar los datos: {error?.message}</p>
			</div>
		)
	}
	const pieChartData = useMemo(
		() => [
			{
				name: DeviceMonitoringStatuses.ONLINE,
				count: deviceMonitoringDashboardByState.online
			},
			{
				name: DeviceMonitoringStatuses.OFFLINE,
				count: deviceMonitoringDashboardByState.offline
			}
		],
		[deviceMonitoringDashboardByState.offline, deviceMonitoringDashboardByState.online]
	)
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<PieCard
				data={pieChartData}
				dataKey="count"
				total={deviceMonitoringDashboardByState.total}
				title="Estado General de Dispositivos"
				desc="Visión general de dispositivos activos e inactivos en la red."
				colors={['#09713a', '#d52920']}
			/>
			<Card className="h-full md:min-h-[560px]">
				<CardHeader>
					<CardTitle>Estado de Dispositivos por Estado</CardTitle>
					<CardDescription>
						Distribución de dispositivos activos e inactivos por estado geográfico.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{deviceMonitoringDashboardByState.byState &&
					deviceMonitoringDashboardByState.byState.length > 0 ? (
						deviceMonitoringDashboardByState.byState.map(device => (
							<StatusProgress
								label={device.stateName}
								total={device.total}
								value={device.onlineCount}
								indicatorColor="bg-verde"
								backgroundColor="bg-rojo"
							/>
						))
					) : (
						<div className="flex h-full items-center justify-center">
							<Typography variant="p" color="gris">
								No hay datos de dispositivos por estado disponibles.
							</Typography>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
})

DeviceMonitoringChart.displayName = 'DeviceMonitoringChart'

// Placeholder for a more engaging loading component
const LoadingSpinner = () => (
	<div className="flex h-full min-h-[300px] items-center justify-center">
		<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900 dark:border-gray-100"></div>
		<p className="ml-4 text-gray-700 dark:text-gray-300">
			Cargando datos del monitoreo de dispositivos...
		</p>
	</div>
)
