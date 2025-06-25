import { lazy, memo, Suspense } from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import { type LocationMonitoringDashboardByStateDto } from '@/core/locations/locationMonitoring/domain/dto/LocationMonitoringDashboardByState.dto'
import { type DeviceMonitoringDashboardByStateDto } from '@/core/devices/deviceMonitoring/domain/dto/DeviceMonitoringDashboardByState.dto'

const Card = lazy(() => import('@/components/Card').then(m => ({ default: m.Card })))
const CardContent = lazy(() => import('@/components/Card').then(m => ({ default: m.CardContent })))
const CardDescription = lazy(() =>
	import('@/components/Card').then(m => ({ default: m.CardDescription }))
)
const CardHeader = lazy(() => import('@/components/Card').then(m => ({ default: m.CardHeader })))
const CardTitle = lazy(() => import('@/components/Card').then(m => ({ default: m.CardTitle })))
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
}

export const MonitoringChart = memo(
	({ error, isError, isLoading, monitoringDashboardByState }: MonitoringChartProps) => {
		const cardTitleId = 'network-status-chart-title'
		const cardDescriptionId = 'network-status-chart-description'

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
					<CardTitle id={cardTitleId}> Estado General de Conexiones de Red</CardTitle>
					<CardDescription id={cardDescriptionId}>
						Visión general de las conexiones activas e inactivas en toda la red,
						categorizadas por estado.
					</CardDescription>
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
