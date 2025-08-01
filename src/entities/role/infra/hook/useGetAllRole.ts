import { useQuery } from '@tanstack/react-query'
import { RoleGetAllService } from '@/entities/role/infra/service/roleGetAll.service'
import { RoleGetByCriteria } from '../../application/RoleGetByCriteria'
import { type RoleFilters } from '../../application/createRoleQueryParams'

const repository = new RoleGetAllService()
const getAll = new RoleGetByCriteria(repository)
export const useGetAllRoles = (query: RoleFilters) => {
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
