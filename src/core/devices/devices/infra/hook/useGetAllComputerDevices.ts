import { useQuery } from '@tanstack/react-query'
import { DeviceComputerFilter } from '@/core/devices/devices/application/computerFilter/DeviceComputerFilter'
import { DeviceGetAllService } from '@/core/devices/devices/infra/service/deviceGetAll.service'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'

const repository = new DeviceGetAllService()
const getAll = new DeviceComputerFilter(repository)
export const useGetAllComputerDevices = (query: DeviceComputerFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: devices
	} = useQuery({
		queryKey: ['devices', query],
		queryFn: () => getAll.search(query)
	})

	return {
		isLoading,
		refetch,
		isError,
		devices
	}
}
