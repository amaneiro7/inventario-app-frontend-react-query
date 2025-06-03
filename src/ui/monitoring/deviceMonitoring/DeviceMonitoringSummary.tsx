import { memo, useMemo } from 'react'
import { formattedDate } from '@/utils/formatDate'
import { useGetDeviceMonitoringDashboard } from '@/core/devices/deviceMonitoring/infra/hook/useGetDeviceMonitoringDashboard'
import { BasicStatCard } from '@/components/BasicStatCard'
import { Activity, Server, Wifi, WifiOff } from 'lucide-react'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'

interface DeviceMonitoringSummaryProps {
	query: DeviceMonitoringFilters
}

export const DeviceMonitoringSummary = memo(({ query }: DeviceMonitoringSummaryProps) => {
	const { deviceMonitoringDashboard, isError, isLoading, error, isFetching, dataUpdatedAt } =
		useGetDeviceMonitoringDashboard(query)

	if (isError) {
		// Provide a more informative error message
		return (
			<div className="p-4 text-center text-red-500" role="alert" aria-live="assertive">
				Error al cargar el resumen del monitoreo: {error?.message || 'Error desconocido'}
			</div>
		)
	}

	// Opcional: Si quieres un mensaje explícito cuando NO hay datos DESPUÉS de la carga inicial
	// y no es un estado de error, puedes añadirlo aquí.
	if (!isLoading && !deviceMonitoringDashboard) {
		return (
			<div className="p-4 text-center text-gray-500" role="status" aria-live="polite">
				No hay datos de monitoreo disponibles con los filtros actuales.
			</div>
		)
	}

	// Muestra skeletons si está cargando. Si hay un error, el mensaje de error tendrá prioridad.
	// Si no hay datos y no está cargando (ej. primera carga sin datos), muestra también skeletons o un mensaje de "sin datos".
	const showSkeletons = isLoading && !deviceMonitoringDashboard

	// Calcula los porcentajes solo si hay datos para evitar divisiones por cero en el render inicial
	const totalOnlinePercentage = useMemo(() => {
		return deviceMonitoringDashboard && deviceMonitoringDashboard?.total > 0
			? ((deviceMonitoringDashboard.online / deviceMonitoringDashboard.total) * 100).toFixed(
					1
				)
			: '0.0'
	}, [deviceMonitoringDashboard])
	const totalOfflinePercentage = useMemo(() => {
		return deviceMonitoringDashboard && deviceMonitoringDashboard?.total > 0
			? ((deviceMonitoringDashboard.offline / deviceMonitoringDashboard.total) * 100).toFixed(
					1
				)
			: '0.0'
	}, [deviceMonitoringDashboard])
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto]">
			<BasicStatCard
				title="Total Equipos"
				icon={<Server className="h-4 w-4 text-gray-500" aria-hidden="true" />}
				value={`${deviceMonitoringDashboard?.total}`}
				desc="Dispositivos registrados y monitoreados."
				loading={showSkeletons}
			/>
			<BasicStatCard
				title="Total Activos"
				icon={<Wifi className="text-verde h-4 w-4" aria-hidden="true" />}
				value={`${deviceMonitoringDashboard?.online}`}
				desc={`${totalOnlinePercentage}% del total`}
				loading={showSkeletons}
			/>
			<BasicStatCard
				title="Total Inactivos"
				icon={<WifiOff className="text-rojo h-4 w-4" aria-hidden="true" />}
				value={`${deviceMonitoringDashboard?.offline}`}
				desc={`${totalOfflinePercentage}% del total`}
				loading={showSkeletons}
			/>
			<BasicStatCard
				title="Última Actualización"
				icon={<Activity className="h-4 w-4 text-gray-500" aria-hidden="true" />}
				value={dataUpdatedAt ? formattedDate(dataUpdatedAt) : 'N/A'}
				desc={isFetching ? 'Actualizando ahora...' : 'Datos actualizados en tiempo real.'}
				loading={showSkeletons}
			/>
		</div>
	)
})
