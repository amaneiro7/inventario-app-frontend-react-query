import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MainCategoryGetAllService } from '../service/mainCategoryGetAll.service'
import { MainCategoryGetByCriteria } from '@/entities/mainCategory/application/MainCategoryGetByCriteria'
import { type MainCategoryFilters } from '@/entities/mainCategory/application/CreateMainCategoryQueryParams'

export const useGetAllMainCategory = (query: MainCategoryFilters) => {
	const repository = useMemo(() => new MainCategoryGetAllService(), [])
	const getAll = useMemo(() => new MainCategoryGetByCriteria(repository), [repository])

	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['mainCategories', query],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
