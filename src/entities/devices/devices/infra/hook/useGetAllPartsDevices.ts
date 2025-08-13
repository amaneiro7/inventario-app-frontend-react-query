import { useQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/entities/devices/devices/infra/service/deviceGetAll.service'
import { DevicePartsFilter } from '../../application/parts/DevicePartsFilter'
import { REFETCH_INTERVAL_IN_MS } from '../../domain/entity/refetchIntervalInMs'
import { type DeviceBaseFilters } from '../../application/createDeviceQueryParams'

const repository = new DeviceGetAllService()
const getAll = new DevicePartsFilter(repository)
export const useGetAllPartsDevices = (query: DeviceBaseFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: devices
	} = useQuery({
		queryKey: ['devices', 'parts', query],
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
