import { useQuery } from '@tanstack/react-query'
import { DeviceMonitoringDashboardByStateService } from '../service/deviceMonitoringGetDashboardByState.service'
import { GetDeviceMonitoringDashboardByState } from '../../application/GetDeviceMonitoringDashboardByState'
import { type DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'

const repository = new DeviceMonitoringDashboardByStateService()
const get = new GetDeviceMonitoringDashboardByState(repository)
export const useGetDeviceMonitoringDashboardByState = (query: DeviceMonitoringFilters) => {
	const ONE_MINUTE_IN_MS = 60 * 1000
	const {
		isLoading,
		refetch,
		isError,
		error,
		dataUpdatedAt,
		isFetching,
		data: deviceMonitoringDashboardByState
	} = useQuery({
		queryKey: ['deviceMonitoringDashboardByState', query],
		queryFn: () => get.execute(query),
		staleTime: ONE_MINUTE_IN_MS,
		refetchInterval: ONE_MINUTE_IN_MS,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true
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
