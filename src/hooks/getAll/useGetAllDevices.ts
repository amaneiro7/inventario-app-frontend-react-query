import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
	DeviceComputerFilter,
	type DeviceComputerFilters
} from '@/core/devices/devices/application/DeviceComputerFilter'
import { DeviceGetAllService } from '@/core/devices/devices/infra/deviceGetAll.service'

export const useGetAllDevicess = (query: DeviceComputerFilters) => {
	const repository = useMemo(() => new DeviceGetAllService(), [])
	const getAll = useMemo(() => new DeviceComputerFilter(repository), [repository])
	const {
		isLoading,
		isError,
		data: devices
	} = useQuery({
		queryKey: ['devices', query.options],
		queryFn: async () => await getAll.search(query)
	})

	return {
		isLoading,
		isError,
		devices
	}
}
