import { useQuery } from '@tanstack/react-query'
import { CargoGetAllService } from '../service/cargoGetAll.service'
import { CargoGetByCriteria } from '../../application/CargoGetByCriteria'
import { type CargoFilters } from '../../application/createCargoQueryParams'

const repository = new CargoGetAllService()
const getAll = new CargoGetByCriteria(repository)
export const useGetAllCargo = (query: CargoFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['cargos', query],
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
