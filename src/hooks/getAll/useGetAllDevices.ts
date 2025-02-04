import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
	DeviceComputerFilter,
	type DeviceComputerFilters
} from '@/core/devices/devices/application/DeviceComputerFilter'
import { DeviceGetAllService } from '@/core/devices/devices/infra/deviceGetAll.service'

export const useGetAllDevicess = ({ options, pageNumber, pageSize }: DeviceComputerFilters) => {
	console.log(pageNumber)
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
