import { ISPLinkGetByCriteria } from '../../application/ISPLinkGetByCriteria'
import { useQuery } from '@tanstack/react-query'
import { ISPLinkGetAllService } from '../service/ispLinkGetAll.service'
import { type ISPLinkFilters } from '../../application/createISPLinkQueryParams'

const repository = new ISPLinkGetAllService()
const getAll = new ISPLinkGetByCriteria(repository)

export const useGetAllISPLink = (query: ISPLinkFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['isp-links', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
