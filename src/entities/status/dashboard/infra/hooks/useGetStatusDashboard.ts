import { useQuery } from '@tanstack/react-query'
import { StatusDashboardService } from '../service/statusGetDashboard.service'
import { GetStatusDashboard } from '../../application/GetStatusDashboard'

const repository = new StatusDashboardService()
const get = new GetStatusDashboard(repository)

/**
 * A React Query hook for fetching status dashboard data.
 * It uses `GetStatusDashboard` to perform the data retrieval and caches the results.
 *
 * @returns An object containing the loading state, refetch function, error state, and the fetched dashboard data.
 */
export const useGetStatusDashboard = () => {
	const {
		isLoading,
		refetch,
		isError,
		data: statusDashboard
	} = useQuery({
		queryKey: ['dashboard', 'status'],
		queryFn: () => get.execute()
	})

	return {
		isLoading,
		refetch,
		isError,
		statusDashboard
	}
}
