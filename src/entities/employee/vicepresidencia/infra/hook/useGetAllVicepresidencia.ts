import { useQuery } from '@tanstack/react-query'
import { type VicepresidenciaFilters } from '../../application/createVicepresidenciaQueryParams'
import { VicepresidenciaGetAllService } from '../service/vicepresidenciaGetAll.service'
import { VicepresidenciaGetByCriteria } from '../../application/VicepresidenciaGetByCriteria'

const repository = new VicepresidenciaGetAllService()
const getAll = new VicepresidenciaGetByCriteria(repository)

/**
 * A React Query hook for fetching all vicepresidencia data based on provided filters.
 * It uses `VicepresidenciaGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching vicepresidencias.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
export const useGetAllVicepresidencias = (query: VicepresidenciaFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['vicepresidencias', query],
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