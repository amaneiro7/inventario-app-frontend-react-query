import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/entities/devices/devices/infra/service/deviceGetAll.service'
import { DeviceGetByCriteria } from '../../application/inputSearch/DeviceGetByCiteria'
import { type DeviceFilters } from '../../application/inputSearch/createDeviceQueryParams'

export const useGetAllDevicesInputSearch = (query: DeviceFilters) => {
	const repository = useMemo(() => new DeviceGetAllService(), [])
	const getAll = useMemo(() => new DeviceGetByCriteria(repository), [repository])

	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['deviceSerialInputSearch', query],
		queryFn: () => getAll.search(query)
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
