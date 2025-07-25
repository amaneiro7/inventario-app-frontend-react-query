import { memo } from 'react'
import { useGetLocationMonitoringDashboard } from '@/core/locations/locationMonitoring/infra/hook/useGetLocationMonitoringDashboard'
import { MonitoringSummary } from '../MonitoringSummary'
import { type LocationMonitoringFilters } from '@/core/locations/locationMonitoring/application/createLocationMonitoringQueryParams'

interface LocationMonitoringSummaryProps {
	query: LocationMonitoringFilters
}

export const LocationMonitoringSummary = memo(({ query }: LocationMonitoringSummaryProps) => {
	const { locationMonitoringDashboard, isError, isLoading, error, isFetching, dataUpdatedAt } =
		useGetLocationMonitoringDashboard(query)
	return (
		<MonitoringSummary
			isError={isError}
			dataUpdatedAt={dataUpdatedAt}
			error={error}
			isFetching={isFetching}
			isLoading={isLoading}
			data={locationMonitoringDashboard}
		/>
	)
})
