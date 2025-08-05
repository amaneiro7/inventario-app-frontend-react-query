import { useQuery } from '@tanstack/react-query'
import { CargoGetAllService } from '../service/cargoGetAll.service'
import { CargoGetByCriteria } from '../../application/CargoGetByCriteria'
import { type CargoFilters } from '../../application/createCargoQueryParams'

const repository = new CargoGetAllService()
const getAll = new CargoGetByCriteria(repository)

/**
 * A React Query hook for fetching all cargo data based on provided filters.
 * It uses `CargoGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching cargos.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
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