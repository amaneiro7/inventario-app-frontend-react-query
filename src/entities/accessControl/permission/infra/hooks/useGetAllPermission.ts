import { useQuery } from '@tanstack/react-query'
import { PermissionGetByCriteria } from '../../application/PermissionGetByCriteria'
import { PermissionGetAllService } from '../service/permissionGetAll.service'
import { type PermissionFilters } from '../../application/createPermissionQueryParams'

const getAll = new PermissionGetByCriteria(new PermissionGetAllService())

export const useGetAllPermissions = (query: PermissionFilters) => {
	const { isLoading, refetch, isError, data, ...results } = useQuery({
		queryKey: ['permissions', query],
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
