import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { HardDriveCapacityGetAllService } from '../service/hardDriveCapacityGetAll.service'
import { HardDriveCapacityGetByCriteria } from '../../application/HardDriveCapacityGetByCriteria'
import { type HardDriveCapacityFilters } from '../../application/createHardDriveCapacityQueryParams'
export const useGetAllHardDriveCapacity = (query: HardDriveCapacityFilters) => {
	const repository = useMemo(() => new HardDriveCapacityGetAllService(), [])
	const getAll = useMemo(() => new HardDriveCapacityGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: HardDriveCapacities
	} = useQuery({
		queryKey: ['HardDriveCapacities', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		HardDriveCapacities
	}
}
