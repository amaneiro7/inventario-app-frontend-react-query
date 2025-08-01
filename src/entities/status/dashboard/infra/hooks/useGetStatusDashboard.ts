import { useQuery } from '@tanstack/react-query'
import { StatusDashboardService } from '../service/statusGetDashboard.service'
import { GetStatusDashboard } from '../../application/GetStatusDashboard'

const repository = new StatusDashboardService()
const get = new GetStatusDashboard(repository)
export const useGetStatusDashboard = () => {
	const {
		isLoading,
		refetch,
		isError,
		data: statusDashboard
	} = useQuery({
		queryKey: ['statusDashboard'],
		queryFn: () => get.execute()
	})

	return {
		isLoading,
		refetch,
		isError,
		statusDashboard
	}
}
