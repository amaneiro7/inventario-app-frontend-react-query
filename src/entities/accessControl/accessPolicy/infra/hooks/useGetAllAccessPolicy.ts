import { useQuery } from '@tanstack/react-query'
import { AccessPolicyGetByCriteria } from '../../application/AccessPolicyGetByCriteria'
import { AccessPolicyGetAllService } from '../service/accessPolicyGetAll.service'
import { type AccessPolicyFilters } from '../../application/createAccessPolicyQueryParams'

const getAll = new AccessPolicyGetByCriteria(new AccessPolicyGetAllService())

export const useGetAllAccessPolicies = (query: AccessPolicyFilters) => {
	const { isLoading, refetch, isError, data, ...results } = useQuery({
		queryKey: ['accessPolicies', query],
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
