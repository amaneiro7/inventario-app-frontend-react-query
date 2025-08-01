import { useQuery } from '@tanstack/react-query'
import { LocationMonitoringDashboardService } from '../service/locationMonitoringGetDashboard.service'
import { GetLocationMonitoringDashboard } from '../../application/GetLocationMonitoringDashboard'
import { type LocationMonitoringFilters } from '../../application/createLocationMonitoringQueryParams'

const repository = new LocationMonitoringDashboardService()
const get = new GetLocationMonitoringDashboard(repository)
export const useGetLocationMonitoringDashboard = (query: LocationMonitoringFilters) => {
	const ONE_MINUTE_IN_MS = 60 * 1000
	const {
		isLoading,
		refetch,
		isError,
		error,
		dataUpdatedAt,
		isFetching,
		data: locationMonitoringDashboard
	} = useQuery({
		queryKey: ['locationMonitoringDashboard', query],
		queryFn: () => get.execute(query),
		staleTime: ONE_MINUTE_IN_MS,
		refetchInterval: ONE_MINUTE_IN_MS,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true
	})

	return {
		isLoading,
		refetch,
		isError,
		error,
		isFetching,
		dataUpdatedAt,
		locationMonitoringDashboard
	}
}
