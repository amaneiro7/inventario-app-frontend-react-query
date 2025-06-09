import { useQuery } from '@tanstack/react-query'
import { LocationMonitoringDashboardByStateService } from '../service/locationMonitoringGetDashboardByState.service'
import { GetLocationMonitoringDashboardByState } from '../../application/GetLocationMonitoringDashboardByState'

const repository = new LocationMonitoringDashboardByStateService()
const get = new GetLocationMonitoringDashboardByState(repository)
export const useGetLocationMonitoringDashboardByState = () => {
	const ONE_MINUTE_IN_MS = 60 * 1000
	const {
		isLoading,
		refetch,
		isError,
		error,
		dataUpdatedAt,
		isFetching,
		data: locationMonitoringDashboardByState
	} = useQuery({
		queryKey: ['locationMonitoringDashboardByState'],
		queryFn: () => get.execute(),
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
		locationMonitoringDashboardByState
	}
}
