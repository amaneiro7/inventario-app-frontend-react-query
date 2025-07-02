import { memo } from 'react'
import { useGetLocationMonitoringDashboardByState } from '@/core/locations/locationMonitoring/infra/hook/useGetLocationMonitoringDashboardByState'
import { MonitoringChart } from '../MonitoringChart'
import { type LocationMonitoringFilters } from '@/core/locations/locationMonitoring/application/createLocationMonitoringQueryParams'

interface LocationMonitoringChartProps {
	query: LocationMonitoringFilters
}

export const LocationMonitoringChart = memo(({ query }: LocationMonitoringChartProps) => {
	const { locationMonitoringDashboardByState, isError, isLoading, error } =
		useGetLocationMonitoringDashboardByState(query)

	return (
		<MonitoringChart
			chartType="locations"
			error={error}
			isError={isError}
			isLoading={isLoading}
			monitoringDashboardByState={locationMonitoringDashboardByState}
		/>
	)
})

LocationMonitoringChart.displayName = 'LocationMonitoringChart'
