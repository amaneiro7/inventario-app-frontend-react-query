import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CargoGetAllService } from '../service/cargoGetAll.service'
import { CargoGetByCriteria } from '../../application/CargoGetByCriteria'
import { type CargoFilters } from '../../application/createCargoQueryParams'

export const useGetAllCargo = (query: CargoFilters) => {
	const repository = useMemo(() => new CargoGetAllService(), [])
	const getAll = useMemo(() => new CargoGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: cargos
	} = useQuery({
		queryKey: ['cargos', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		cargos
	}
}
