import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { OperatingSystemArqGetByCriteria } from '@/entities/devices/features/operatingSystem/operatingSystemArq/application/OperatingSystemArqGetByCriteria'
import { OperatingSystemArqGetAllService } from '../service/operatingSystemArqGetAll.service'
import { type OperatingSystemArqFilters } from '../../application/createOperatingSystemArqQueryParams'

export const useGetAllOperatingSystemArq = (query: OperatingSystemArqFilters) => {
	const repository = useMemo(() => new OperatingSystemArqGetAllService(), [])
	const getAll = useMemo(() => new OperatingSystemArqGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: operatingSystemArqs
	} = useQuery({
		queryKey: ['operatingSystemArqs', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		operatingSystemArqs
	}
}
