import { memo } from 'react'
import CountUp from 'react-countup'
import { formatDateTime } from '@/shared/lib/utils/formatDate'
import { BasicStatCard } from '@/shared/ui/BasicStatCard'
import { Icon } from '@/shared/ui/icon/Icon'

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
		// Si hay un error, mostramos un estado de error dentro de las tarjetas para no romper la UI.
		if (isError) {
			return (
				<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<BasicStatCard
						title="Error"
						icon={<Icon name="alertTriangle" className="text-rojo-500 h-4 w-4" />}
						value="Fallo"
						desc={error?.message ?? 'No se pudieron cargar los datos.'}
						error
					/>
					<BasicStatCard title="Conexiones Activas" value="-" error />
					<BasicStatCard title="Conexiones Inactivas" value="-" error />
					<BasicStatCard title="Última Actualización" value="-" error />
				</section>
			)
		}

		const total = data?.total ?? 0
		const online = data?.online ?? 0
		const offline = data?.offline ?? 0

		const totalOnlinePercentage = total > 0 ? ((online / total) * 100).toFixed(0) : '0'
		const totalOfflinePercentage = total > 0 ? ((offline / total) * 100).toFixed(0) : '0'

		return (
			<section
				className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				aria-label="Resumen del Estado de la Conectividad de la Red"
				role="region"
			>
				<BasicStatCard
					title="Total de Conexiones"
					icon={
						<Icon name="server" className="h-4 w-4 text-gray-600" aria-hidden="true" />
					}
					value={<CountUp end={total} duration={1.5} separator="." />}
					desc="Conexiones de red registradas y monitoreadas."
					loading={isLoading}
				/>
				<BasicStatCard
					title="Conexiones Activas"
					icon={<Icon name="wifi" className="text-verde h-4 w-4" aria-hidden="true" />}
					value={<CountUp end={online} duration={1.5} separator="." />}
					desc={`${totalOnlinePercentage}% del total`}
					loading={isLoading}
				/>
				<BasicStatCard
					title="Conexiones Inactivas"
					icon={<Icon name="wifiOff" className="text-rojo h-4 w-4" aria-hidden="true" />}
					value={<CountUp end={offline} duration={1.5} separator="." />}
					desc={`${totalOfflinePercentage}% del total`}
					loading={isLoading}
				/>
				<BasicStatCard
					title="Última Actualización"
					icon={
						<Icon
							name="activity"
							className="h-4 w-4 text-gray-500"
							aria-hidden="true"
						/>
					}
					value={dataUpdatedAt ? formatDateTime(dataUpdatedAt) : 'N/A'}
					desc={
						isFetching ? 'Actualizando ahora...' : 'Datos actualizados en tiempo real.'
					}
					loading={isLoading}
				/>
			</section>
		)
	}
)
