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
		if (isLoading || !monitoringDashboardByState) {
			return <LoadingSpinner />
		}

		if (isError) {
			return (
				<Suspense>
					<ChartErrorMessage error={error} />
				</Suspense>
			)
		}

		const { online, offline, total, byState } = monitoringDashboardByState

		return (
			<Suspense fallback={<div className="min-h-96" />}>
				<Card>
					<CardHeader>
						<CardTitle>Estado General de ubicaciones</CardTitle>
						<CardDescription>
							Visión general de ubicaciones activos e inactivos en la red.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1fr_400px]">
						<SummaryPieChart
							onlineCount={online}
							offlineCount={offline}
							totalCount={total}
						/>

						<ByStateList statesData={byState} />
					</CardContent>
				</Card>
			</Suspense>
		)
	}
)

MonitoringChart.displayName = 'MonitoringChart'
