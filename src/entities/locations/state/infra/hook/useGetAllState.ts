import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { StateGetByCriteria } from '@/entities/locations/state/application/StateGetByCriteria'
import { StateGetAllService } from '../service/stateGeAll.service'
import { type StateFilters } from '../../application/createStateQueryParams'

export const useGetAllState = (query: StateFilters) => {
	const repository = useMemo(() => new StateGetAllService(), [])
	const getAll = useMemo(() => new StateGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: states
	} = useQuery({
		queryKey: ['states', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		states
	}
}
