import { memo } from 'react'
import { Activity, Server, Wifi, WifiOff } from 'lucide-react'
import { useLocationMonitoringSummary } from './useLocationMonitoringSummary'
import { formattedDate } from '@/utils/formatDate'
import { BasicStatCard } from '@/components/BasicStatCard'
import { type LocationMonitoringFilters } from '@/core/locations/locationMonitoring/application/createLocationMonitoringQueryParams'

interface LocationMonitoringSummaryProps {
	query: LocationMonitoringFilters
}

export const LocationMonitoringSummary = memo(({ query }: LocationMonitoringSummaryProps) => {
	const {
		isError,
		dataUpdatedAt,
		error,
		isFetching,
		isLoading,
		locationMonitoringDashboard,
		showSkeletons,
		totalOfflinePercentage,
		totalOnlinePercentage
	} = useLocationMonitoringSummary({ query })

	if (isError) {
		return (
			<div className="p-4 text-center text-red-500" role="alert" aria-live="assertive">
				Error al cargar el resumen del monitoreo: {error?.message || 'Error desconocido'}
			</div>
		)
	}

	if (!isLoading && !locationMonitoringDashboard) {
		return (
			<div className="p-4 text-center text-gray-500" role="status" aria-live="polite">
				No hay datos de monitoreo disponibles con los filtros actuales.
			</div>
		)
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,300px)]">
			<BasicStatCard
				title="Total Equipos"
				icon={<Server className="h-4 w-4 text-gray-500" aria-hidden="true" />}
				value={`${locationMonitoringDashboard?.total}`}
				desc="Dispositivos registrados y monitoreados."
				loading={showSkeletons}
			/>
			<BasicStatCard
				title="Total Activos"
				icon={<Wifi className="text-verde h-4 w-4" aria-hidden="true" />}
				value={`${locationMonitoringDashboard?.online}`}
				desc={`${totalOnlinePercentage}% del total`}
				loading={showSkeletons}
			/>
			<BasicStatCard
				title="Total Inactivos"
				icon={<WifiOff className="text-rojo h-4 w-4" aria-hidden="true" />}
				value={`${locationMonitoringDashboard?.offline}`}
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
