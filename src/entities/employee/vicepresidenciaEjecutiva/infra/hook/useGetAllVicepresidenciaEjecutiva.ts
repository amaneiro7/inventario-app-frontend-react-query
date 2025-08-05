import { useQuery } from '@tanstack/react-query'
import { type VicepresidenciaEjecutivaFilters } from '../../application/createVicepresidenciaEjecutivaQueryParams'
import { VicepresidenciaEjecutivaGetAllService } from '../service/vicepresidenciaEjecutivaGetAll.service'
import { VicepresidenciaEjecutivaGetByCriteria } from '../../application/VicepresidenciaEjecutivaGetByCriteria'

const repository = new VicepresidenciaEjecutivaGetAllService()
const getAll = new VicepresidenciaEjecutivaGetByCriteria(repository)

/**
 * A React Query hook for fetching all executive vicepresidencia data based on provided filters.
 * It uses `VicepresidenciaEjecutivaGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching executive vicepresidencias.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
export const useGetAllVicepresidenciaEjecutivas = (query: VicepresidenciaEjecutivaFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['vicepresidenciaEjecutivas', query],
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
