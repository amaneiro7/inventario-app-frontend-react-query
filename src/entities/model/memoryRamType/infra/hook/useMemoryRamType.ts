import { useQuery } from '@tanstack/react-query'
import { MemoryRamTypeGetAllService } from '../service/memoryRamTypeGetAll.service'
import { MemoryRamTypeGetByCriteria } from '../../application/MemoryRamTypeGetByCriteria'
import { type MemoryRamTypeFilters } from '../../application/createMemoryRamTypeQueryParams'

const repository = new MemoryRamTypeGetAllService()
const getAll = new MemoryRamTypeGetByCriteria(repository)

/**
 * A React Query hook for fetching all memory RAM type data based on provided filters.
 * It uses `MemoryRamTypeGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching memory RAM types.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
export const useGetAllMemoryRamType = (query: MemoryRamTypeFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['memoryRamTypes', query],
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
