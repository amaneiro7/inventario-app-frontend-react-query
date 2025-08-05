import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { StatusGetByCriteria } from '../../application/StatusGetByCriteria'
import { StatusGetAllService } from '../service/StatusGetAll.service'
import { type StatusFilters } from '../../application/createStatusQueryParams'

export const useGetAllStatus = (query: StatusFilters) => {
	const repository = useMemo(() => new StatusGetAllService(), [])
	const getAll = useMemo(() => new StatusGetByCriteria(repository), [repository])

	/**
	 * A React Query hook for fetching all status data based on provided filters.
	 * It uses `StatusGetByCriteria` to perform the search and caches the results.
	 *
	 * @param query - An object containing filter criteria and pagination options for fetching statuses.
	 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
	 */
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['status', query],
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