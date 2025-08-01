import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProcessorGetByCriteria } from '../../application/ProcessorGetByCriteria'
import { ProcessorGetAllService } from '../service/processorGetAll.service'
import { type ProcessorFilters } from '../../application/createProcessorQueryParams'

export const useGetAllProcessor = (query: ProcessorFilters) => {
	const repository = useMemo(() => new ProcessorGetAllService(), [])
	const getAll = useMemo(() => new ProcessorGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: processor
	} = useQuery({
		queryKey: ['processors', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		processor
	}
}
