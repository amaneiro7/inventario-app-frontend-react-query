import { useQuery } from '@tanstack/react-query'
import { DeviceMonitoringDashboardByStateService } from '../service/deviceMonitoringGetDashboardByState.service'
import { GetDeviceMonitoringDashboardByState } from '../../application/GetDeviceMonitoringDashboardByState'

const repository = new DeviceMonitoringDashboardByStateService()
const get = new GetDeviceMonitoringDashboardByState(repository)
export const useGetDeviceMonitoringDashboardByState = () => {
	const {
		isLoading,
		refetch,
		isError,
		error,
		dataUpdatedAt,
		isFetching,
		data: deviceMonitoringDashboardByState
	} = useQuery({
		queryKey: ['deviceMonitoringDashboardByState'],
		queryFn: () => get.execute()
	})

	return {
		isLoading,
		refetch,
		isError,
		error,
		isFetching,
		dataUpdatedAt,
		deviceMonitoringDashboardByState
	}
}
