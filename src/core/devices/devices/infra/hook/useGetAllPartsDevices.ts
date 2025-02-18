import { useMemo } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/core/devices/devices/infra/service/deviceGetAll.service'
import { DevicePartsFilter } from '../../application/parts/DevicePartsFilter'
import { type DevicePartsFilters } from '../../application/parts/CreateDevicePartsParams'

export const useGetAllPartsDevices = (query: DevicePartsFilters) => {
	const repository = useMemo(() => new DeviceGetAllService(), [])
	const getAll = useMemo(() => new DevicePartsFilter(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: devices
	} = useSuspenseQuery({
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
