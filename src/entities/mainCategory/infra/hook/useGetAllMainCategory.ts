import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MainCategoryGetAllService } from '../service/mainCategoryGetAll.service'
import { MainCategoryGetByCriteria } from '@/entities/mainCategory/application/MainCategoryGetByCriteria'
import { type MainCategoryFilters } from '@/entities/mainCategory/application/CreateMainCategoryQueryParams'

export const useGetAllMainCategory = (query: MainCategoryFilters) => {
	const repository = useMemo(() => new MainCategoryGetAllService(), [])
	const getAll = useMemo(() => new MainCategoryGetByCriteria(repository), [repository])

	/**
	 * A React Query hook for fetching all main category data based on provided filters.
	 * It uses `MainCategoryGetByCriteria` to perform the search and caches the results.
	 *
	 * @param query - An object containing filter criteria and pagination options for fetching main categories.
	 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
	 */
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
