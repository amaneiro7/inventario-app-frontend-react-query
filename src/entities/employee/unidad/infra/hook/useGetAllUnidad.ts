import { useQuery } from '@tanstack/react-query'
import { UnidadGetAllService } from '../service/unidadGetAll.service'
import { UnidadGetByCriteria } from '../../application/UnidadGetByCriteria'
import { type UnidadFilters } from '../../application/createUnidadQueryParams'
const repository = new UnidadGetAllService()
const getAll = new UnidadGetByCriteria(repository)

/**
 * A React Query hook for fetching all Unidad data based on provided filters.
 * It uses `UnidadGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching unidades.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
export const useGetAllUnidad = (query: UnidadFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['unidades', query],
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
