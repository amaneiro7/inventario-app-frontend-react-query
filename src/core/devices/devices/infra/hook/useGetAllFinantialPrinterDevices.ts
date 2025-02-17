import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/core/devices/devices/infra/service/deviceGetAll.service'
import { DeviceFinantialPrinterFilter } from '../../application/finantialPrinter/DeviceFinantialPrinterFilter'
import { type DeviceFinantialPrinterFilters } from '../../application/finantialPrinter/CreateDeviceFinantialPrinterParams'

export const useGetAllFinantialPrinterDevices = (query: DeviceFinantialPrinterFilters) => {
	const repository = useMemo(() => new DeviceGetAllService(), [])
	const getAll = useMemo(() => new DeviceFinantialPrinterFilter(repository), [repository])

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
