import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CentroCostoGetAllService } from '../service/centroCostoGetAll.service'
import { CentroCostoGetByCriteria } from '../../application/CentroCostoGetByCriteria'
import { type CentroCostoFilters } from '../../application/createCentroCostoQueryParams'

export const useGetAllCentroCosto = (query: CentroCostoFilters) => {
	const repository = useMemo(() => new CentroCostoGetAllService(), [])
	const getAll = useMemo(() => new CentroCostoGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: centroCostos
	} = useQuery({
		queryKey: ['centroCostos', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		centroCostos
	}
}
