import { useQuery } from '@tanstack/react-query'
import { DeviceMonitoringDashboardService } from '../service/deviceMonitoringGetDashboard.service'
import { GetDeviceMonitoringDashboard } from '../../application/GetDeviceMonitoringDashboard'
import { type DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'

const repository = new DeviceMonitoringDashboardService()
const get = new GetDeviceMonitoringDashboard(repository)
export const useGetDeviceMonitoringDashboard = (query: DeviceMonitoringFilters) => {
	const ONE_MINUTE_IN_MS = 60 * 1000
	const {
		isLoading,
		refetch,
		isError,
		error,
		dataUpdatedAt,
		isFetching,
		data: deviceMonitoringDashboard
	} = useQuery({
		queryKey: ['deviceMonitoringDashboard', query],
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
		deviceMonitoringDashboard
	}
}
