import { useQuery } from '@tanstack/react-query'
import { LocationStatusGetAllService } from '../service/locationStatusGetAll.service'
import { LocationStatusGetByCriteria } from '../../application/LocationStatusGetByCriteria'
import { type LocationStatusFilters } from '../../application/createLocationStatusQueryParams'

const repository = new LocationStatusGetAllService()
const getAll = new LocationStatusGetByCriteria(repository)
export const useGetAllLocationStatus = (query: LocationStatusFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: locationStatus
	} = useQuery({
		queryKey: ['locationStatus', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		locationStatus
	}
}
