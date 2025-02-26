import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { OperatingSystemGetByCriteria } from '@/core/devices/features/operatingSystem/operatingSystem/application/OperatingSystemGetByCriteria'
import { OperatingSystemGetAllService } from '../service/operatingSystemGetAll.service'
import { type OperatingSystemFilters } from '../../application/createOperatingSystemQueryParams'

export const useGetAllOperatingSystem = (query: OperatingSystemFilters) => {
	const repository = useMemo(() => new OperatingSystemGetAllService(), [])
	const getAll = useMemo(() => new OperatingSystemGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: operatingSystems
	} = useQuery({
		queryKey: ['operatingSystems', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		operatingSystems
	}
}
