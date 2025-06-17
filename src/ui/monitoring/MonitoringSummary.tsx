import { memo } from 'react'
import { Activity, Server, Wifi, WifiOff } from 'lucide-react'
import { formattedDate } from '@/utils/formatDate'
import { BasicStatCard } from '@/components/BasicStatCard'
import Typography from '@/components/Typography'

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
				<div
					className="border-rojo-400 bg-rojo-50 space-y-1 rounded-md border p-4 text-center"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
				>
					<Typography variant="p" weight="semibold" color="rojo">
						Error al cargar el resumen del monitoreo:
					</Typography>
					<Typography variant="p" color="rojo">
						{error?.message || 'Ha ocurrido un error desconocido.'}
					</Typography>
				</div>
			)
		}
		if (!isLoading && (!data || total === 0)) {
			// If total is 0, then effectively there's no data to display.
			return (
				<div
					className="space-y-1 rounded-md border border-gray-300 bg-gray-50 p-4 text-center"
					role="status"
					aria-live="polite"
				>
					<Typography variant="p" weight="semibold" color="rojo">
						No hay datos de monitoreo disponibles.
					</Typography>
					<Typography variant="p" color="rojo">
						Por favor, ajusta los filtros o intenta de nuevo más tarde.
					</Typography>
				</div>
			)
		}
		return (
			<section
				// className="grid gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,300px)]"
				className="grid gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
				aria-label="Resumen de Equipos Monitoreados"
				role="region"
			>
				<BasicStatCard
					title="Total Equipos"
					icon={<Server className="h-4 w-4 text-gray-500" aria-hidden="true" />}
					value={`${total}`}
					desc="Dispositivos registrados y monitoreados."
					loading={showSkeletons}
				/>
				<BasicStatCard
					title="Total Activos"
					icon={<Wifi className="text-verde h-4 w-4" aria-hidden="true" />}
					value={`${online}`}
					desc={`${totalOnlinePercentage}% del total`}
					loading={showSkeletons}
				/>
				<BasicStatCard
					title="Total Inactivos"
					icon={<WifiOff className="text-rojo h-4 w-4" aria-hidden="true" />}
					value={`${offline}`}
					desc={`${totalOfflinePercentage}% del total`}
					loading={showSkeletons}
				/>
				<BasicStatCard
					title="Última Actualización"
					icon={<Activity className="h-4 w-4 text-gray-500" aria-hidden="true" />}
					value={dataUpdatedAt ? formattedDate(dataUpdatedAt) : 'N/A'}
					desc={
						isFetching ? 'Actualizando ahora...' : 'Datos actualizados en tiempo real.'
					}
					loading={showSkeletons}
				/>
			</section>
		)
	}
)
