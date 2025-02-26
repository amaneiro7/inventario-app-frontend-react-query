import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RoleGetAllService } from '@/core/role/infra/service/roleGetAll.service'
import { RoleGetByCriteria } from '../../application/RoleGetByCriteria'
import { type RoleFilters } from '../../application/createRoleQueryParams'

export const useGetAllRoles = (query: RoleFilters) => {
	const repository = useMemo(() => new RoleGetAllService(), [])
	const getAll = useMemo(() => new RoleGetByCriteria(repository), [repository])
	const {
		isLoading,
		refetch,
		isError,
		data: roles
	} = useQuery({
		queryKey: ['roles', query],
		queryFn: () => getAll.search(query)
	})

	return {
		isLoading,
		refetch,
		isError,
		roles
	}
}
