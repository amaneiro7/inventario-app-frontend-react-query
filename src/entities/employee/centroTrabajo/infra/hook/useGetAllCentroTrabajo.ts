import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CentroTrabajoGetAllService } from '../service/centroTrabajoGetAll.service'
import { CentroTrabajoGetByCriteria } from '../../application/CentroTrabajoGetByCriteria'
import { type CentroTrabajoFilters } from '../../application/createCentroTrabajoQueryParams'

export const useGetAllCentroTrabajo = (query: CentroTrabajoFilters) => {
	const repository = useMemo(() => new CentroTrabajoGetAllService(), [])
	const getAll = useMemo(() => new CentroTrabajoGetByCriteria(repository), [repository])

	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['centroTrabajos', query],
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
