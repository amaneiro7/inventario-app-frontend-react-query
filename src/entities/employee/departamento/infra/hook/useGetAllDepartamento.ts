import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DepartamentoGetByCriteria } from '../../application/DepartamentoGetByCriteria'
import { DepartamentoGetAllService } from '../service/departamentoGetAll.service'
import { type DepartamentoFilters } from '../../application/createDepartamentoQueryParams'

export const useGetAllDepartamento = (query: DepartamentoFilters) => {
	const repository = useMemo(() => new DepartamentoGetAllService(), [])
	const getAll = useMemo(() => new DepartamentoGetByCriteria(repository), [repository])

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
