import { useQuery } from '@tanstack/react-query'
import { HistoryDashboardService } from '../service/historyGetDashboard.service'
import { GetHistoryDashboard } from '../../application/GetGeneralDashboard'

const repository = new HistoryDashboardService()
const get = new GetHistoryDashboard(repository)
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
