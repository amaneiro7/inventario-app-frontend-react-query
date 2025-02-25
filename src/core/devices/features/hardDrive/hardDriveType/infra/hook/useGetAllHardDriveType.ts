import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { HardDriveTypeGetAllService } from '../service/hardDriveTypeGetAll.service'
import { HardDriveTypeGetByCriteria } from '../../application/HardDriveTypeGetByCriteria'
import { type HardDriveTypeFilters } from '../../application/createHardDriveTypeQueryParams'
export const useGetAllHardDriveType = (query: HardDriveTypeFilters) => {
	const repository = useMemo(() => new HardDriveTypeGetAllService(), [])
	const getAll = useMemo(() => new HardDriveTypeGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: HardDriveTypes
	} = useQuery({
		queryKey: ['HardDriveTypes', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		HardDriveTypes
	}
}
