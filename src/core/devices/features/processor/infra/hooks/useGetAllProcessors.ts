import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
	type ProcessorFilters,
	ProcessorGetByCriteria
} from '../../application/ProcessorGetByCriteria'
import { ProcessorGetAllService } from '../processorGetAll.service'

export const useGetAllProcessor = (query: ProcessorFilters) => {
	const repository = useMemo(() => new ProcessorGetAllService(), [])
	const getAll = useMemo(() => new ProcessorGetByCriteria(repository), [repository])

	const {
		isLoading,
		isError,
		data: processor
	} = useQuery({
		queryKey: ['processors', query.options],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		isError,
		processor
	}
}
