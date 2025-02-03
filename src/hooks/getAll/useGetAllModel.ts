import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ModelGetAllService } from '@/core/model/models/infra/modelGetAll.service'
import {
	type ModelFilters,
	ModelGetByCriteria
} from '@/core/model/models/application/ModelGetByCriteria'

export const useGetAllModel = (query: ModelFilters) => {
	const repository = useMemo(() => new ModelGetAllService(), [])
	const getAll = useMemo(() => new ModelGetByCriteria(repository), [repository])

	const {
		isLoading,
		isError,
		data: models
	} = useQuery({
		queryKey: ['models', query.options],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		isError,
		models
	}
}
