import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CategoryGetByCriteria } from '@/core/category/application/CategoryGetByCriteria'
import { CategoryGetAllService } from '../service/categoryGetAll.service'
import { type CategoryFilters } from '@/core/category/application/CreateCategoryQueryParams'

export const useGetAllCategory = (query: CategoryFilters) => {
	const repository = useMemo(() => new CategoryGetAllService(), [])
	const getAll = useMemo(() => new CategoryGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: categories
	} = useQuery({
		queryKey: ['categories', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		categories
	}
}
