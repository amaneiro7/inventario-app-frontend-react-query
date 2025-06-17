import { memo } from 'react'
import { useGetLocationMonitoringDashboardByState } from '@/core/locations/locationMonitoring/infra/hook/useGetLocationMonitoringDashboardByState'
import { MonitoringChart } from '../MonitoringChart'

export const LocationMonitoringChart = memo(() => {
	const { locationMonitoringDashboardByState, isError, isLoading, error } =
		useGetLocationMonitoringDashboardByState()

	return (
		<MonitoringChart
			error={error}
			isError={isError}
			isLoading={isLoading}
			monitoringDashboardByState={locationMonitoringDashboardByState}
		/>
	)
})

LocationMonitoringChart.displayName = 'LocationMonitoringChart'
