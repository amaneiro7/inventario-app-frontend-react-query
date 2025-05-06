import { useQuery } from '@tanstack/react-query'
import { ModelGetAllService } from '@/core/model/models/infra/service/modelGetAll.service'
import { ModelGetByCriteria } from '@/core/model/models/application/ModelGetByCriteria'
import { type ModelFilters } from '@/core/model/models/application/CreateModelsQueryParams'

const repository = new ModelGetAllService()
const getAll = new ModelGetByCriteria(repository)
export const useGetAllModel = (query: ModelFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: models
	} = useQuery({
		queryKey: ['models', query],
		queryFn: () => getAll.search(query),
		staleTime: 60 * 1000,
		refetchOnMount: true,
		refetchInterval: 5 * 1000
	})

	return {
		isLoading,
		refetch,
		isError,
		models
	}
}
