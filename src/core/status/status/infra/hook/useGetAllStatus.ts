import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { StatusGetByCriteria } from '../../application/StatusGetByCriteria'
import { StatusGetAllService } from '../service/StatusGetAll.service'
import { type StatusFilters } from '../../application/createStatusQueryParams'

export const useGetAllStatus = (query: StatusFilters) => {
	const repository = useMemo(() => new StatusGetAllService(), [])
	const getAll = useMemo(() => new StatusGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: status
	} = useQuery({
		queryKey: ['status', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		status
	}
}
