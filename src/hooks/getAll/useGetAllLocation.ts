import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
	type LocationFilters,
	LocationGetByCriteria
} from '@/core/locations/locations/application/LocationGetByCriteria'
import { LocationGetAllService } from '@/core/locations/locations/infra/locationGetAll.service'

export const useGetAllLocations = (query: LocationFilters) => {
	const repository = useMemo(() => new LocationGetAllService(), [])
	const getAll = useMemo(() => new LocationGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: locations
	} = useQuery({
		queryKey: ['locations', query.options],
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
