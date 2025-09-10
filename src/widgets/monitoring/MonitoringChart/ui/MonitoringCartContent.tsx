import { Suspense, lazy } from 'react'
import { MonitoringChartSkeleton } from './MonitoringChartSkeleton'
import { type LocationMonitoringDashboardByStateDto } from '@/entities/locations/locationMonitoring/domain/dto/LocationMonitoringDashboardByState.dto'
import { type DeviceMonitoringDashboardByStateDto } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoringDashboardByState.dto'
const StateMonitoringList = lazy(() =>
	import('@/widgets/monitoring/StateMonitoringList/ui/StateMonitoringList').then(m => ({
		default: m.StateMonitoringList
	}))
)
const SummaryPieChart = lazy(() =>
	import('@/widgets/monitoring/SummaryPieChart/ui/SummaryPieChart').then(m => ({
		default: m.SummaryPieChart
	}))
)

const ChartErrorMessage = lazy(() =>
	import('@/shared/ui/ChartErrorMessage').then(m => ({ default: m.ChartErrorMessage }))
)

interface MonitoringCartContentProps {
	isError: boolean
	isLoading: boolean
	error: Error | null
	monitoringDashboardByState?:
		| DeviceMonitoringDashboardByStateDto
		| LocationMonitoringDashboardByStateDto
	chartType: 'devices' | 'locations'
}

export const MonitoringCartContent = ({
	isError,
	isLoading,
	error,
	monitoringDashboardByState
}: MonitoringCartContentProps) => {
	if (isLoading) {
		return <MonitoringChartSkeleton />
	}
	if (isError) {
		return <ChartErrorMessage error={error} />
	}

	return (
		<>
			{monitoringDashboardByState && (
				<>
					<Suspense fallback={<div className="min-h-96" />}>
						<SummaryPieChart
							onlineCount={monitoringDashboardByState.online}
							offlineCount={monitoringDashboardByState.offline}
							totalCount={monitoringDashboardByState.total}
						/>
					</Suspense>
					<Suspense fallback={<ListSkeleton />}>
						<StateMonitoringList statesData={monitoringDashboardByState.byState} />
					</Suspense>
				</>
			)}
		</>
	)
}

const ListSkeleton = () => (
	<section
		className="animate-pulse-medium flex h-[400px] flex-col gap-4 rounded-lg border bg-slate-100 p-6 pb-0.5 shadow-lg"
		aria-labelledby="state-details-title"
	>
		<div className="h-7 w-4/6 rounded bg-gray-300" />
		{Array.from({ length: 7 }).map((_, index) => (
			<div key={`skeleton-${index}`} className="h-8 w-full rounded-full bg-gray-300" />
		))}
	</section>
)
