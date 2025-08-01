import { useQuery } from '@tanstack/react-query'
import { GeneralDashboardService } from '../service/generalGetDashboard.service'
import { GetGeneralDashboard } from '../../application/GetGeneralDashboard'

const repository = new GeneralDashboardService()
const get = new GetGeneralDashboard(repository)
export const useGetGeneralDashboard = () => {
	const {
		isLoading,
		refetch,
		isError,
		data: generalDashboard
	} = useQuery({
		queryKey: ['generalDashboard'],
		queryFn: () => get.execute()
	})

	return {
		isLoading,
		refetch,
		isError,
		generalDashboard
	}
}
