import { useQuery } from '@tanstack/react-query'
import { LocationMonitoringGetByCriteria } from '../../application/LocationMonitoringGetByCriteria'
import { LocationMonitoringGetAllService } from '../service/locationMonitoringGetAll.service'
import { type LocationMonitoringFilters } from '../../application/createLocationMonitoringQueryParams'

const repository = new LocationMonitoringGetAllService()
const getAll = new LocationMonitoringGetByCriteria(repository)
export const useGetAllLocationMonitorings = (query: LocationMonitoringFilters) => {
	const ONE_MINUTE_IN_MS = 60 * 1000
	const {
		isLoading,
		isFetching,
		refetch,
		isError,
		data: locationMonitorings
	} = useQuery({
		queryKey: ['locationMonitorings', query],
		queryFn: () => getAll.search(query),
		staleTime: ONE_MINUTE_IN_MS,
		refetchInterval: ONE_MINUTE_IN_MS,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true
	})

	return {
		isLoading,
		refetch,
		isFetching,
		isError,
		locationMonitorings
	}
}
