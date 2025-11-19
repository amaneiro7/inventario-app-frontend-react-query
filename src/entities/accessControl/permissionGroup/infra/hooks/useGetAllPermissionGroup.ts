import { useQuery } from '@tanstack/react-query'
import { PermissionGroupGetByCriteria } from '../../application/PermissionGroupGetByCriteria'
import { PermissionGroupGetAllService } from '../service/permissionGroupGetAll.service'
import { type PermissionGroupFilters } from '../../application/createPermissionGroupQueryParams'

const getAll = new PermissionGroupGetByCriteria(new PermissionGroupGetAllService())

export const useGetAllPermissionGroups = (query: PermissionGroupFilters) => {
	const { isLoading, refetch, isError, data, ...results } = useQuery({
		queryKey: ['permissionGroups', query],
		queryFn: () => getAll.search(query)
	})

	return {
		isLoading,
		refetch,
		isError,
		data,
		...results
	}
}
