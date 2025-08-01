import { useQuery } from '@tanstack/react-query'
import { DeviceMonitoringDashboardByLocationService } from '../service/deviceMonitoringGetDashboardByLocation.service'
import { GetDeviceMonitoringDashboardByLocation } from '../../application/GetDeviceMonitoringDashboardByLocation'
import { type DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'

const repository = new DeviceMonitoringDashboardByLocationService()
const get = new GetDeviceMonitoringDashboardByLocation(repository)
export const useGetDeviceMonitoringDashboardByLocation = (query: DeviceMonitoringFilters) => {
	const ONE_MINUTE_IN_MS = 60 * 1000
	const {
		isLoading,
		refetch,
		isError,
		error,
		dataUpdatedAt,
		isFetching,
		data: deviceMonitoringDashboardByLocation
	} = useQuery({
		queryKey: ['deviceMonitoringDashboardByLocation', query],
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
		deviceMonitoringDashboardByLocation
	}
}
