import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
	type StatusFilters,
	StatusGetByCriteria
} from '@/core/status/application/StatusGetByCriteria'
import { StatusGetAllService } from '@/core/status/infra/StatusGetAll.service'

export const useGetAllStatus = (query: StatusFilters) => {
	const repository = useMemo(() => new StatusGetAllService(), [])
	const getAll = useMemo(() => new StatusGetByCriteria(repository), [repository])

	const {
		isLoading,
		isError,
		data: status
	} = useQuery({
		queryKey: ['status', query.options],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		isError,
		status
	}
}
