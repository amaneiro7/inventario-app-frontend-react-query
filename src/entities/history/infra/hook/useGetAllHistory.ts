import { useQuery } from '@tanstack/react-query'
import { HistoryGetAllService } from '../service/historyGetAll.service'
import { HistoryGetByCriteria } from '../../application/HistoryGetByCriteria'
import { type HistoryFilters } from '../../application/createHistoryQueryParams'

const repository = new HistoryGetAllService()
const getAll = new HistoryGetByCriteria(repository)

/**
 * A React Query hook for fetching all history records based on provided filters.
 * It uses `HistoryGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching history records.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
export const useGetAllHistorys = (query: HistoryFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['histories', query],
		queryFn: () => getAll.search(query),
		staleTime: 5 * 1000
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
