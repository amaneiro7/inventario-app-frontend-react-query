import { useQuery } from '@tanstack/react-query'
import { HistoryDashboardService } from '../service/historyGetDashboard.service'
import { GetHistoryDashboard } from '../../application/GetGeneralDashboard'

const repository = new HistoryDashboardService()
const get = new GetHistoryDashboard(repository)

/**
 * A React Query hook for fetching general history dashboard data.
 * It uses `GetHistoryDashboard` to perform the data retrieval and caches the results.
 *
 * @returns An object containing the loading state, refetch function, error state, and the fetched dashboard data.
 */
export const useGetHistoryDashboard = () => {
	const {
		isLoading,
		refetch,
		isError,
		data: historyDashboard
	} = useQuery({
		queryKey: ['historyDashboard'],
		queryFn: () => get.execute()
	})

	return {
		isLoading,
		refetch,
		isError,
		historyDashboard
	}
}
