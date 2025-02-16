import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
	CategoryFilters,
	CategoryGetByCriteria
} from '@/core/category/application/CategoryGetByCriteria'
import { CategoryGetAllService } from '@/core/category/infra/categoryGetAll.service'

export const useGetAllCategory = (query: CategoryFilters) => {
	const repository = useMemo(() => new CategoryGetAllService(), [])
	const getAll = useMemo(() => new CategoryGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: categories
	} = useQuery({
		queryKey: ['categories', query.options],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		categories
	}
}
