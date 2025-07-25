import { useQuery } from '@tanstack/react-query'
import { DeviceComputerFilter } from '@/core/devices/devices/application/computerFilter/DeviceComputerFilter'
import { DeviceGetAllService } from '@/core/devices/devices/infra/service/deviceGetAll.service'
import { REFETCH_INTERVAL_IN_MS } from '../../domain/entity/refetchIntervalInMs'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'

const repository = new DeviceGetAllService()
const getAll = new DeviceComputerFilter(repository)
export const useGetAllComputerDevices = ({ query }: { query: DeviceComputerFilters }) => {
	const {
		isLoading,
		refetch,
		isError,
		data: devices
	} = useQuery({
		queryKey: ['devices', query],
		queryFn: () => getAll.search(query),
		staleTime: 60 * 1000,
		refetchOnMount: true,
		refetchInterval: REFETCH_INTERVAL_IN_MS
	})

	return {
		isLoading,
		refetch,
		isError,
		devices
	}
}
