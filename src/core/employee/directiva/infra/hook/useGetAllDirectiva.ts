import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DirectivaGetAllService } from '../service/directivaGetAll.service'
import { DirectivaGetByCriteria } from '../../application/DirectivaGetByCriteria'
import { type DirectivaFilters } from '../../application/createDirectivaQueryParams'

export const useGetAllDirectiva = (query: DirectivaFilters) => {
	const repository = useMemo(() => new DirectivaGetAllService(), [])
	const getAll = useMemo(() => new DirectivaGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: directivas
	} = useQuery({
		queryKey: ['directivas', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		directivas
	}
}
