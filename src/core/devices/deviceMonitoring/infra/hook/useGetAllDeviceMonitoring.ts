import { useQuery } from '@tanstack/react-query'
import { DeviceMonitoringGetByCriteria } from '../../application/DeviceMonitoringGetByCriteria'
import { DeviceMonitoringGetAllService } from '../service/deviceMonitoringGetAll.service'
import { type DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'

const repository = new DeviceMonitoringGetAllService()
const getAll = new DeviceMonitoringGetByCriteria(repository)
export const useGetAllDeviceMonitorings = (query: DeviceMonitoringFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: deviceMonitorings
	} = useQuery({
		queryKey: ['deviceMonitorings', query],
		queryFn: () => getAll.search(query),
		staleTime: 5 * 60 * 1000 // 5 minutos
	})

	return {
		isLoading,
		refetch,
		isError,
		deviceMonitorings
	}
}
