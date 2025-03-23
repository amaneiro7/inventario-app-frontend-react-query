import { useQuery } from '@tanstack/react-query'
import { LocationGetByCriteria } from '@/core/locations/locations/application/LocationGetByCriteria'
import { LocationGetAllService } from '@/core/locations/locations/infra/service/locationGetAll.service'
import { type LocationFilters } from '../../application/CreateLocationQueryParams'

const repository = new LocationGetAllService()
const getAll = new LocationGetByCriteria(repository)
export const useGetAllLocations = (query: LocationFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: locations
	} = useQuery({
		queryKey: ['locations', query],
		queryFn: () => getAll.search(query),
		staleTime: 5 * 1000
	})

	return {
		isLoading,
		refetch,
		isError,
		locations
	}
}
