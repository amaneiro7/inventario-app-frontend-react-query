import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { OperatingSystemArqGetAllService } from '@/core/devices/features/operatingSystem/operatingSystemArq/infra/operatingSystemArqGetAll.service'
import {
	type OperatingSystemArqFilters,
	OperatingSystemArqGetByCriteria
} from '@/core/devices/features/operatingSystem/operatingSystemArq/application/OperatingSystemArqGetByCriteria'

export const useGetAllOperatingSystemArq = (query: OperatingSystemArqFilters) => {
	const repository = useMemo(() => new OperatingSystemArqGetAllService(), [])
	const getAll = useMemo(() => new OperatingSystemArqGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: operatingSystemArqs
	} = useQuery({
		queryKey: ['operatingSystemArqs', query.options],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		operatingSystemArqs
	}
}
