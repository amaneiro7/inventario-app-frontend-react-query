import { useQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/entities/devices/devices/infra/service/deviceGetAll.service'
import { DevicePrinterFilter } from '../../application/printer/DevicePrinterFilter'
import { REFETCH_INTERVAL_IN_MS } from '../../domain/entity/refetchIntervalInMs'
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
		refetchInterval: REFETCH_INTERVAL_IN_MS
	})

	return {
		isLoading,
		refetch,
		isError,
		devices
	}
}
