import { useMemo } from 'react'
import { RoleGetAll } from '@/core/role/application/RoleGetAll'
import { useQuery } from '@tanstack/react-query'
import { RoleGetAllService } from '@/core/role/infra/roleGetAll.service'

export const useGetAllRoles = () => {
	const repository = useMemo(() => new RoleGetAllService(), [])
	const getAll = useMemo(() => new RoleGetAll(repository).execute(), [repository])
	const {
		isLoading,
		refetch,
		isError,
		data: roles
	} = useQuery({
		queryKey: ['roles'],
		queryFn: () => getAll
	})

	return {
		isLoading,
		refetch,
		isError,
		roles
	}
}
