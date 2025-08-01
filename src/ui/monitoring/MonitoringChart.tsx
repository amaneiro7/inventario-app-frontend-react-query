import { lazy, memo, Suspense, useMemo } from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import { type LocationMonitoringDashboardByStateDto } from '@/entities/locations/locationMonitoring/domain/dto/LocationMonitoringDashboardByState.dto'
import { type DeviceMonitoringDashboardByStateDto } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoringDashboardByState.dto'

const Card = lazy(() => import('@/shared/ui/Card').then(m => ({ default: m.Card })))
const CardContent = lazy(() => import('@/shared/ui/Card').then(m => ({ default: m.CardContent })))
const CardDescription = lazy(() =>
	import('@/shared/ui/Card').then(m => ({ default: m.CardDescription }))
)
const CardHeader = lazy(() => import('@/shared/ui/Card').then(m => ({ default: m.CardHeader })))
const CardTitle = lazy(() => import('@/shared/ui/Card').then(m => ({ default: m.CardTitle })))
const ByStateList = lazy(() => import('./ByStateList').then(m => ({ default: m.ByStateList })))
const SummaryPieChart = lazy(() =>
	import('./SummaryPieChart').then(m => ({ default: m.SummaryPieChart }))
)

const ChartErrorMessage = lazy(() =>
	import('./ChartErrorMessage').then(m => ({ default: m.ChartErrorMessage }))
)

interface MonitoringChartProps {
	isError: boolean
	isLoading: boolean
	error: Error | null
	monitoringDashboardByState?:
		| DeviceMonitoringDashboardByStateDto
		| LocationMonitoringDashboardByStateDto
	chartType: 'devices' | 'locations'
}

export const MonitoringChart = memo(
	({
		error,
		isError,
		isLoading,
		monitoringDashboardByState,
		chartType
	}: MonitoringChartProps) => {
		const cardTitleId = 'network-status-chart-title'
		const cardDescriptionId = 'network-status-chart-description'

		const { title, description } = useMemo(() => {
			if (chartType === 'devices') {
				return {
					title: 'Estado de Conectividad de Equipos de Red',
					description:
						'Visión general del estado (activos/inactivos) de los equipos de red en toda la infraestructura, categorizados por estado geográfico.'
				}
			} else {
				// chartType === 'locations'
				return {
					title: 'Estado de Conectividad de Enlaces y Agencias',
					description:
						'Visión general del estado (operativos/inoperativos) de los enlaces de red y la conectividad de las agencias, detallado por estado geográfico.'
				}
			}
		}, [chartType]) // Re-compute if chartType changes

		if (isLoading || !monitoringDashboardByState) {
			return <LoadingSpinner />
		}

		if (isError) {
			return (
				<Suspense
					fallback={
						<div className="flex min-h-96 items-center justify-center">
							Cargando mensaje de error...
						</div>
					}
				>
					<ChartErrorMessage error={error} />
				</Suspense>
			)
		}

		const { online, offline, total, byState } = monitoringDashboardByState

		return (
			<Card
				className="flex h-full w-full flex-col"
				role="region"
				aria-labelledby={cardTitleId}
				aria-describedby={cardDescriptionId}
			>
				<CardHeader>
					<CardTitle id={cardTitleId}>{title}</CardTitle>
					<CardDescription id={cardDescriptionId}>{description}</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1fr_400px]">
					<Suspense fallback={<div className="min-h-96" />}>
						<SummaryPieChart
							onlineCount={online}
							offlineCount={offline}
							totalCount={total}
						/>
					</Suspense>

					<ByStateList statesData={byState} />
				</CardContent>
			</Card>
		)
	}
)

MonitoringChart.displayName = 'MonitoringChart'
