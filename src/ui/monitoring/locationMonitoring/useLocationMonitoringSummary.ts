import { useMemo } from 'react'
import { useGetLocationMonitoringDashboard } from '@/core/locations/locationMonitoring/infra/hook/useGetLocationMonitoringDashboard'
import { LocationMonitoringFilters } from '@/core/locations/locationMonitoring/application/createLocationMonitoringQueryParams'

interface UseLocationMonitoringSummaryProps {
	query: LocationMonitoringFilters
}

export const useLocationMonitoringSummary = ({ query }: UseLocationMonitoringSummaryProps) => {
	const { locationMonitoringDashboard, isError, isLoading, error, isFetching, dataUpdatedAt } =
		useGetLocationMonitoringDashboard(query)

	const showSkeletons = isLoading && !locationMonitoringDashboard

	const totalOnlinePercentage = useMemo(() => {
		return locationMonitoringDashboard && locationMonitoringDashboard?.total > 0
			? (
					(locationMonitoringDashboard.online / locationMonitoringDashboard.total) *
					100
				).toFixed(1)
			: '0.0'
	}, [locationMonitoringDashboard])
	const totalOfflinePercentage = useMemo(() => {
		return locationMonitoringDashboard && locationMonitoringDashboard?.total > 0
			? (
					(locationMonitoringDashboard.offline / locationMonitoringDashboard.total) *
					100
				).toFixed(1)
			: '0.0'
	}, [locationMonitoringDashboard])

	return {
		locationMonitoringDashboard,
		isError,
		isLoading,
		error,
		isFetching,
		dataUpdatedAt,
		showSkeletons,
		totalOnlinePercentage,
		totalOfflinePercentage
	}
}
