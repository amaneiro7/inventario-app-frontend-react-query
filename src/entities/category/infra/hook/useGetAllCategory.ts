import { useQuery } from '@tanstack/react-query'
import { CategoryGetByCriteria } from '@/entities/category/application/CategoryGetByCriteria'
import { CategoryGetAllService } from '../service/categoryGetAll.service'
import { type CategoryFilters } from '@/entities/category/application/CreateCategoryQueryParams'

const repository = new CategoryGetAllService()
const getAll = new CategoryGetByCriteria(repository)

export const useGetAllCategory = (query: CategoryFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['categories', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
