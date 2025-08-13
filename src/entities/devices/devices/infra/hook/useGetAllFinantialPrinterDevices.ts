import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/entities/devices/devices/infra/service/deviceGetAll.service'
import { DeviceFinantialPrinterFilter } from '../../application/finantialPrinter/DeviceFinantialPrinterFilter'
import { REFETCH_INTERVAL_IN_MS } from '../../domain/entity/refetchIntervalInMs'
import { type DeviceBaseFilters } from '../../application/createDeviceQueryParams'

export const useGetAllFinantialPrinterDevices = (query: DeviceBaseFilters) => {
	const repository = useMemo(() => new DeviceGetAllService(), [])
	const getAll = useMemo(() => new DeviceFinantialPrinterFilter(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: devices
	} = useQuery({
		queryKey: ['devices', 'finantial-printers', query],
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
