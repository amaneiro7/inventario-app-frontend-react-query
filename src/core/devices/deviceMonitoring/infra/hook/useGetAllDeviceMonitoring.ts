import { useQuery } from '@tanstack/react-query'
import { DeviceMonitoringGetByCriteria } from '../../application/DeviceMonitoringGetByCriteria'
import { DeviceMonitoringGetAllService } from '../service/deviceMonitoringGetAll.service'
import { type DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'

const repository = new DeviceMonitoringGetAllService()
const getAll = new DeviceMonitoringGetByCriteria(repository)
export const useGetAllDeviceMonitorings = (query: DeviceMonitoringFilters) => {
	const ONE_MINUTE_IN_MS = 60 * 1000
	const {
		isLoading,
		isFetching,
		refetch,
		isError,
		data: deviceMonitorings
	} = useQuery({
		queryKey: ['deviceMonitorings', query],
		queryFn: () => getAll.search(query),
		staleTime: ONE_MINUTE_IN_MS,
		refetchInterval: ONE_MINUTE_IN_MS,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true
	})

	return {
		isLoading,
		refetch,
		isFetching,
		isError,
		deviceMonitorings
	}
}
