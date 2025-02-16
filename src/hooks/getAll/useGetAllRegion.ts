import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
	type RegionFilters,
	RegionGetByCriteria
} from '@/core/locations/region/application/RegionGetByCriteria'
import { RegionGetAllService } from '@/core/locations/region/infra/regionGetlAll.service'

export const useGetAllRegion = (query: RegionFilters) => {
	const repository = useMemo(() => new RegionGetAllService(), [])
	const getAll = useMemo(() => new RegionGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: regions
	} = useQuery({
		queryKey: ['regions', query.options],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		regions
	}
}
