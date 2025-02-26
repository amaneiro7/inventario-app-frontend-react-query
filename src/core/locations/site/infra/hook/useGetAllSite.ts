import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SiteGetAllService } from '../service/siteGetAll.service'
import { SiteGetByCriteria } from '../../application/SiteGetByCriteria'
import { type SiteFilters } from '../../application/createSiteQueryParams'

export const useGetAllSites = (query: SiteFilters) => {
	const repository = useMemo(() => new SiteGetAllService(), [])
	const getAll = useMemo(() => new SiteGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: sites
	} = useQuery({
		queryKey: ['sites', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		sites
	}
}
