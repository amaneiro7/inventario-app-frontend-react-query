import { useMemo } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/core/devices/devices/infra/service/deviceGetAll.service'
import { DeviceScreenFilter } from '../../application/screenFilter/DeviceScreenFilter'
import { type DeviceScreenFilters } from '@/core/devices/devices/application/screenFilter/CreateDeviceScreenParams'

export const useGetAllScreenDevices = (query: DeviceScreenFilters) => {
	const repository = useMemo(() => new DeviceGetAllService(), [])
	const getAll = useMemo(() => new DeviceScreenFilter(repository), [repository])

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
