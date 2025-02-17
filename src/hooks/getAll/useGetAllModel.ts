import { useMemo } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ModelGetAllService } from '@/core/model/models/infra/modelGetAll.service'
import { ModelGetByCriteria } from '@/core/model/models/application/ModelGetByCriteria'
import { type ModelFilters } from '@/core/model/models/application/CreateModelsQueryParams'

export const useGetAllModel = (query: ModelFilters) => {
	const repository = useMemo(() => new ModelGetAllService(), [])
	const getAll = useMemo(() => new ModelGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: models
	} = useSuspenseQuery({
		queryKey: ['models', query],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		models
	}
}
