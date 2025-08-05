import { useQuery } from '@tanstack/react-query'
import { RoleGetAllService } from '@/entities/role/infra/service/roleGetAll.service'
import { RoleGetByCriteria } from '../../application/RoleGetByCriteria'
import { type RoleFilters } from '../../application/createRoleQueryParams'

const repository = new RoleGetAllService()
const getAll = new RoleGetByCriteria(repository)

/**
 * A React Query hook for fetching all role data based on provided filters.
 * It uses `RoleGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching roles.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
export const useGetAllRoles = (query: RoleFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['roles', query],
		queryFn: () => getAll.search(query)
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}