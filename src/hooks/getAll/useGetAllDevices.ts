import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DeviceComputerFilter } from '@/core/devices/devices/application/DeviceComputerFilter'
import { DeviceGetAllService } from '@/core/devices/devices/infra/deviceGetAll.service'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/CreateDeviceComputerParams'

export const useGetAllDevices = (query: DeviceComputerFilters) => {
	const repository = useMemo(() => new DeviceGetAllService(), [])
	const getAll = useMemo(() => new DeviceComputerFilter(repository), [repository])

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
