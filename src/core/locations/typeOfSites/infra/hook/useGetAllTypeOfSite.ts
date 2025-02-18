import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TypeOfSiteGetAllService } from '@/core/locations/typeOfSites/infra/service/typeOfSiteGetAll.service'
import {
	type TypeOfSiteFilters,
	TypeOfSiteGetByCriteria
} from '@/core/locations/typeOfSites/application/TypeOfSiteGetByCriteria'

export const useGetAllTypeOfSite = (query: TypeOfSiteFilters) => {
	const repository = useMemo(() => new TypeOfSiteGetAllService(), [])
	const getAll = useMemo(() => new TypeOfSiteGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: typeOfSites
	} = useQuery({
		queryKey: ['typeOfSites', query.options],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		typeOfSites
	}
}
