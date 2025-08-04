import { useQuery } from '@tanstack/react-query'
import { InputTypeGetAllService } from '../service/inputTypeGetAll.service'
import { InputTypeGetByCriteria } from '../../application/InputTypeGetByCriteria'
import { type InputTypeFilters } from '../../application/createInputTypeQueryParams'

const repository = new InputTypeGetAllService()
const getAll = new InputTypeGetByCriteria(repository)
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
