import { memo } from 'react'
import { Activity, Server, Wifi, WifiOff } from 'lucide-react'
import { formatDateTime } from '@/shared/lib/utils/formatDate'
import { BasicStatCard } from '@/shared/ui/BasicStatCard'
import Typography from '@/shared/ui/Typography'

interface MonitoringData {
	total: number
	online: number
	offline: number
}

interface MonitoringSummaryProps {
	data: MonitoringData | null | undefined
	isError: boolean
	isLoading: boolean
	dataUpdatedAt: number
	isFetching: boolean
	error: Error | null
}

export const MonitoringSummary = memo(
	({ data, dataUpdatedAt, isError, isFetching, isLoading, error }: MonitoringSummaryProps) => {
		const total = data?.total ?? 0
		const online = data?.online ?? 0
		const offline = data?.offline ?? 0

		const totalOnlinePercentage = total > 0 ? ((online / total) * 100).toFixed(0) : '0'
		const totalOfflinePercentage = total > 0 ? ((offline / total) * 100).toFixed(0) : '0'

		const showSkeletons = isLoading || isFetching

		if (isError) {
			return (
				<section
					className="space-y-2 rounded-lg border border-red-400 bg-red-50 p-6 text-center shadow-md"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
				>
					<Typography variant="p" weight="semibold" color="rojo">
						¡Error al cargar el resumen del monitoreo!
					</Typography>
					<Typography variant="p" color="rojo">
						{error?.message ||
							'Ha ocurrido un problema al obtener los datos. Por favor, inténtalo de nuevo.'}
					</Typography>
				</section>
			)
		}
		if (!isLoading && (!data || total === 0)) {
			// If total is 0, then effectively there's no data to display.
			return (
				<section
					className="space-y-2 rounded-lg border border-gray-300 bg-gray-50 p-6 text-center shadow-md"
					role="status"
					aria-live="polite"
				>
					<Typography variant="p" weight="semibold" color="rojo">
						No hay datos de monitoreo disponibles.
					</Typography>
					<Typography variant="p" color="rojo">
						Ajusta los filtros aplicados o verifica la disponibilidad de información.
					</Typography>
				</section>
			)
		}
		return (
			<section
				className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				aria-label="Resumen del Estado de la Conectividad de la Red"
				role="region"
			>
				<BasicStatCard
					title="Total de Conexiones"
					icon={<Server className="h-4 w-4 text-gray-600" aria-hidden="true" />}
					value={`${total}`}
					desc="Conexiones de red registradas y monitoreadas."
					loading={showSkeletons}
				/>
				<BasicStatCard
					title="Conexiones Activas"
					icon={<Wifi className="text-verde h-4 w-4" aria-hidden="true" />}
					value={`${online}`}
					desc={`${totalOnlinePercentage}% del total`}
					loading={showSkeletons}
				/>
				<BasicStatCard
					title="Conexiones Inactivas"
					icon={<WifiOff className="text-rojo h-4 w-4" aria-hidden="true" />}
					value={`${offline}`}
					desc={`${totalOfflinePercentage}% del total`}
					loading={showSkeletons}
				/>
				<BasicStatCard
					title="Última Actualización"
					icon={<Activity className="h-4 w-4 text-gray-500" aria-hidden="true" />}
					value={dataUpdatedAt ? formatDateTime(dataUpdatedAt) : 'N/A'}
					desc={
						isFetching ? 'Actualizando ahora...' : 'Datos actualizados en tiempo real.'
					}
					loading={showSkeletons}
				/>
			</section>
		)
	}
)
