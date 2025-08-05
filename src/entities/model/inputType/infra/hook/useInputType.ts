import { useQuery } from '@tanstack/react-query'
import { InputTypeGetAllService } from '../service/inputTypeGetAll.service'
import { InputTypeGetByCriteria } from '../../application/InputTypeGetByCriteria'
import { type InputTypeFilters } from '../../application/createInputTypeQueryParams'

const repository = new InputTypeGetAllService()
const getAll = new InputTypeGetByCriteria(repository)

/**
 * A React Query hook for fetching all input type data based on provided filters.
 * It uses `InputTypeGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching input types.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
export const useGetAllInputType = (query: InputTypeFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['inputTypes', query],
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