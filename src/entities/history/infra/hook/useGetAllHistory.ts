import { useQuery } from '@tanstack/react-query'
import { HistoryGetAllService } from '../service/historyGetAll.service'
import { HistoryGetByCriteria } from '../../application/HistoryGetByCriteria'
import { type HistoryFilters } from '../../application/createHistoryQueryParams'

const repository = new HistoryGetAllService()
const getAll = new HistoryGetByCriteria(repository)
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
