import { useQuery } from '@tanstack/react-query'
import { ComputerDashboardService } from '../service/computerGetDashboard.service'
import { GetComputerDashboard } from '../../application/GetComputerDashboard'

const repository = new ComputerDashboardService()
const get = new GetComputerDashboard(repository)
export const useGetComputerDashboard = () => {
	const {
		isLoading,
		refetch,
		isError,
		data: computerDashboard
	} = useQuery({
		queryKey: ['computerDashboard'],
		queryFn: () => get.execute()
	})

	return {
		isLoading,
		refetch,
		isError,
		computerDashboard
	}
}
