import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
	type StateFilters,
	StateGetByCriteria
} from '@/core/locations/state/application/StateGetByCriteria'
import { StateGetAllService } from '@/core/locations/state/infra/stateGeAll.service'

export const useGetAllState = (query: StateFilters) => {
	const repository = useMemo(() => new StateGetAllService(), [])
	const getAll = useMemo(() => new StateGetByCriteria(repository), [repository])

	const {
		isLoading,
		isError,
		data: states
	} = useQuery({
		queryKey: ['states', query.options],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		isError,
		states
	}
}
