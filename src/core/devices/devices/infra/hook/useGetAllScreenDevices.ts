import { useQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/core/devices/devices/infra/service/deviceGetAll.service'
import { DeviceScreenFilter } from '../../application/screenFilter/DeviceScreenFilter'
import { type DeviceScreenFilters } from '@/core/devices/devices/application/screenFilter/CreateDeviceScreenParams'

const repository = new DeviceGetAllService()
const getAll = new DeviceScreenFilter(repository)

export const useGetAllScreenDevices = (query: DeviceScreenFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: devices
	} = useQuery({
		queryKey: ['devices', query],
		queryFn: () => getAll.search(query),
		staleTime: 60 * 1000,
		refetchOnMount: true
	})

	return {
		isLoading,
		refetch,
		isError,
		devices
	}
}
