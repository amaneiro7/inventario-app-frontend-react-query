import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LocationGetByCriteria } from '@/core/locations/locations/application/LocationGetByCriteria'
import { LocationGetAllService } from '@/core/locations/locations/infra/service/locationGetAll.service'
import { type LocationFilters } from '../../application/CreateLocationQueryParams'

export const useGetAllLocations = (query: LocationFilters) => {
	const repository = useMemo(() => new LocationGetAllService(), [])
	const getAll = useMemo(() => new LocationGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: locations
	} = useQuery({
		queryKey: ['locations', query],
		queryFn: async () => await getAll.search(query),
		staleTime: 5 * 1000
	})

	return {
		isLoading,
		refetch,
		isError,
		locations
	}
}
