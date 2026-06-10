import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'
import { formatDateTime } from '@/shared/lib/utils/formatDate'
import { BasicStatCard } from '@/shared/ui/BasicStatCard'
import { CountUpComponent } from '@/shared/ui/CountUpComponent'
import { Icon } from '@/shared/ui/icon/Icon'

export function EvaluationHardwareDashboardSummary({
	summary,
	isLoading = false,
	dataUpdatedAt,
	isFetching,
	isError = false,
	error
}: {
	summary?: EvaluationHardwareDashboardResponse['summary']
	isLoading?: boolean
	dataUpdatedAt: number
	isFetching: boolean
	isError: boolean
	error: Error | null
}) {
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
				<BasicStatCard title="Equipos Aptos" value="-" error />
				<BasicStatCard title="Equipos No Aptos" value="-" error />
				<BasicStatCard title="Última Actualización" value="-" error />
			</section>
		)
	}

	const total = summary?.total ?? 0
	const apto = summary?.apto ?? 0
	const noApto = summary?.noApto ?? 0

	const totalAptoPercentage = total > 0 ? ((apto / total) * 100).toFixed(0) : '0'
	const totalNoAptoPercentage = total > 0 ? ((noApto / total) * 100).toFixed(0) : '0'

	return (
		<section
			className="flex gap-4"
			aria-label="Resumen de Aptitud de Hardware para Windows 10/11"
			role="region"
		>
			<BasicStatCard
				title="Total de Equipos"
				className="min-w-fit flex-2"
				icon={<Icon name="monitor" className="h-4 w-4 text-gray-600" aria-hidden="true" />}
				value={<CountUpComponent end={total} duration={1.5} separator="." />}
				desc="Equipos evaluados para la migración."
				loading={isLoading}
			/>
			<BasicStatCard
				title="Equipos Aptos"
				className="min-w-fit flex-2"
				icon={
					<Icon name="checkCircle2" className="text-verde h-4 w-4" aria-hidden="true" />
				}
				value={<CountUpComponent end={apto} duration={1.5} separator="." />}
				desc={`${totalAptoPercentage}% cumplen requisitos`}
				loading={isLoading}
			/>
			<BasicStatCard
				title="Equipos No Aptos"
				className="min-w-fit flex-2"
				icon={<Icon name="xCircle" className="text-rojo h-4 w-4" aria-hidden="true" />}
				value={<CountUpComponent end={noApto} duration={1.5} separator="." />}
				desc={`${totalNoAptoPercentage}% requieren mejoras`}
				loading={isLoading}
			/>
			<BasicStatCard
				title="Última Actualización"
				className="min-w-fit flex-3"
				icon={<Icon name="activity" className="h-4 w-4 text-gray-500" aria-hidden="true" />}
				value={dataUpdatedAt ? formatDateTime(dataUpdatedAt) : 'N/A'}
				desc={isFetching ? 'Actualizando ahora...' : 'Datos actualizados en tiempo real.'}
				loading={isLoading}
			/>
		</section>
	)
}
