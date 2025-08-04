import { useQuery } from '@tanstack/react-query'
import { DirectivaGetAllService } from '../service/directivaGetAll.service'
import { DirectivaGetByCriteria } from '../../application/DirectivaGetByCriteria'
import { type DirectivaFilters } from '../../application/createDirectivaQueryParams'
const repository = new DirectivaGetAllService()
const getAll = new DirectivaGetByCriteria(repository)

export const useGetAllDirectiva = (query: DirectivaFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['directivas', query],
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
