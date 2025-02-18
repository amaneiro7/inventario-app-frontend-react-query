import { useMemo } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { DeviceComputerFilter } from '@/core/devices/devices/application/computerFilter/DeviceComputerFilter'
import { DeviceGetAllService } from '@/core/devices/devices/infra/service/deviceGetAll.service'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'

export const useGetAllComputerDevices = (query: DeviceComputerFilters) => {
	const repository = useMemo(() => new DeviceGetAllService(), [])
	const getAll = useMemo(() => new DeviceComputerFilter(repository), [repository])

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
