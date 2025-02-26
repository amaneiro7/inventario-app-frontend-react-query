import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RegionGetByCriteria } from '@/core/locations/region/application/RegionGetByCriteria'
import { RegionGetAllService } from '../service/regionGetlAll.service'
import { type RegionFilters } from '../../application/createRegionQueryParams'

export const useGetAllRegion = (query: RegionFilters) => {
	const repository = useMemo(() => new RegionGetAllService(), [])
	const getAll = useMemo(() => new RegionGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: regions
	} = useQuery({
		queryKey: ['regions', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		regions
	}
}
