import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { OperatingSystemGetAllService } from '@/core/devices/features/operatingSystem/operatingSystem/infra/operatingSystemGetAll.service'
import {
	type OperatingSystemFilters,
	OperatingSystemGetByCriteria
} from '@/core/devices/features/operatingSystem/operatingSystem/application/OperatingSystemGetByCriteria'

export const useGetAllOperatingSystem = (query: OperatingSystemFilters) => {
	const repository = useMemo(() => new OperatingSystemGetAllService(), [])
	const getAll = useMemo(() => new OperatingSystemGetByCriteria(repository), [repository])

	const {
		isLoading,
		isError,
		data: operatingSystems
	} = useQuery({
		queryKey: ['operatingSystems', query.options],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		isError,
		operatingSystems
	}
}
