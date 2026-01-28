import { useQuery } from '@tanstack/react-query'
import { DirectivaGetAllService } from '../service/directivaGetAll.service'
import { DirectivaGetByCriteria } from '../../application/DirectivaGetByCriteria'
import { type DirectivaFilters } from '../../application/createDirectivaQueryParams'
const repository = new DirectivaGetAllService()
const getAll = new DirectivaGetByCriteria(repository)

/**
 * A React Query hook for fetching all directiva data based on provided filters.
 * It uses `DirectivaGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching directivas.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
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
