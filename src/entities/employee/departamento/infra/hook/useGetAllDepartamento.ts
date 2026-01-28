import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DepartamentoGetByCriteria } from '../../application/DepartamentoGetByCriteria'
import { DepartamentoGetAllService } from '../service/departamentoGetAll.service'
import { type DepartamentoFilters } from '../../application/createDepartamentoQueryParams'

export const useGetAllDepartamento = (query: DepartamentoFilters) => {
	const repository = useMemo(() => new DepartamentoGetAllService(), [])
	const getAll = useMemo(() => new DepartamentoGetByCriteria(repository), [repository])

	/**
	 * A React Query hook for fetching all departamento data based on provided filters.
	 * It uses `DepartamentoGetByCriteria` to perform the search and caches the results.
	 *
	 * @param query - An object containing filter criteria and pagination options for fetching departamentos.
	 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
	 */
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['departamentos', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
