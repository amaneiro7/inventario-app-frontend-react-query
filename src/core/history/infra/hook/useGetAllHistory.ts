import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { HistoryGetAllService } from '../service/historyGetAll.service'
import { HistoryGetByCriteria } from '../../application/HistoryGetByCriteria'
import { type HistoryFilters } from '../../application/createHistoryQueryParams'

export const useGetAllHistorys = (query: HistoryFilters) => {
	const repository = useMemo(() => new HistoryGetAllService(), [])
	const getAll = useMemo(() => new HistoryGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: histories
	} = useQuery({
		queryKey: ['histories', query],
		queryFn: () => getAll.search(query),
		staleTime: 5 * 1000
	})

	return {
		isLoading,
		refetch,
		isError,
		histories
	}
}
