import { useQuery } from '@tanstack/react-query'
import { TypeOfSiteGetAllService } from '@/core/locations/typeOfSites/infra/service/typeOfSiteGetAll.service'
import { TypeOfSiteGetByCriteria } from '@/core/locations/typeOfSites/application/TypeOfSiteGetByCriteria'
import { type TypeOfSiteFilters } from '../../application/createTypeOfSiteQueryParams'

const repository = new TypeOfSiteGetAllService()
const getAll = new TypeOfSiteGetByCriteria(repository)
export const useGetAllTypeOfSite = (query: TypeOfSiteFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: typeOfSites
	} = useQuery({
		queryKey: ['typeOfSites', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		typeOfSites
	}
}
