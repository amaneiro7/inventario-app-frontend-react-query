import { useQuery } from '@tanstack/react-query'
import { CategoryGetByCriteria } from '@/core/category/application/CategoryGetByCriteria'
import { CategoryGetAllService } from '../service/categoryGetAll.service'
import { type CategoryFilters } from '@/core/category/application/CreateCategoryQueryParams'

const repository = new CategoryGetAllService()
const getAll = new CategoryGetByCriteria(repository)

export const useGetAllCategory = (query: CategoryFilters) => {
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
