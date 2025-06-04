import { useQuery } from '@tanstack/react-query'
import { LocationMonitoringDashboardByStateService } from '../service/locationMonitoringGetDashboardByState.service'
import { GetLocationMonitoringDashboardByState } from '../../application/GetLocationMonitoringDashboardByState'

const repository = new LocationMonitoringDashboardByStateService()
const get = new GetLocationMonitoringDashboardByState(repository)
export const useGetLocationMonitoringDashboardByState = () => {
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
		queryFn: () => get.execute()
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
