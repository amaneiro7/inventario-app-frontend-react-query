import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DeviceComputerFilter } from '@/core/devices/devices/application/DeviceComputerFilter'
import { DeviceGetAllService } from '@/core/devices/devices/infra/deviceGetAll.service'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/CreateDeviceComputerParams'

export const useGetAllDevicess = ({ options, pageNumber, pageSize }: DeviceComputerFilters) => {
	const repository = useMemo(() => new DeviceGetAllService(), [])
	const getAll = useMemo(() => new DeviceComputerFilter(repository), [repository])
	const {
		isLoading,
		isError,
		data: devices
	} = useQuery({
		queryKey: ['devices', options, pageNumber, pageSize],
		queryFn: async () => await getAll.search({ options, pageNumber, pageSize })
	})

	return {
		isLoading,
		isError,
		devices
	}
}
