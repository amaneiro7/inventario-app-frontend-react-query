import { useQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/core/devices/devices/infra/service/deviceGetAll.service'
import { DevicePrinterFilter } from '../../application/printer/DevicePrinterFilter'
import { type DevicePrinterFilters } from '../../application/printer/CreateDevicePrinterParams'

const repository = new DeviceGetAllService()
const getAll = new DevicePrinterFilter(repository)

export const useGetAllPrinterDevices = (query: DevicePrinterFilters) => {
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
		refetchInterval: 5 * 1000
	})

	return {
		isLoading,
		refetch,
		isError,
		devices
	}
}
