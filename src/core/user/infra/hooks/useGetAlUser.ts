import { useQuery } from '@tanstack/react-query'
import { UserGetByCriteria } from '../../application/UserGetByCriteria'
import { UserGetAllService } from '../service/UserGetAll.service'
import { type UserFilters } from '../../application/createUserQueryParams'

const repository = new UserGetAllService()
const getAll = new UserGetByCriteria(repository)

export const useGetAllUser = (query: UserFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: users
	} = useQuery({
		queryKey: ['user', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		users
	}
}
