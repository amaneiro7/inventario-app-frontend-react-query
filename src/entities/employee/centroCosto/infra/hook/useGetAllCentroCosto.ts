import { useQuery } from '@tanstack/react-query'
import { CentroCostoGetAllService } from '../service/centroCostoGetAll.service'
import { CentroCostoGetByCriteria } from '../../application/CentroCostoGetByCriteria'
import { type CentroCostoFilters } from '../../application/createCentroCostoQueryParams'

const repository = new CentroCostoGetAllService()
const getAll = new CentroCostoGetByCriteria(repository)
export const useGetAllCentroCosto = (query: CentroCostoFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['centroCostos', query],
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
