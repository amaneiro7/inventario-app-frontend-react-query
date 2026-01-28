import { useQuery } from '@tanstack/react-query'
import { EmployeeGetAllService } from '@/entities/employee/employee/infra/service/employeeGetAll.service'
import { EmployeeGetByCriteria } from '@/entities/employee/employee/application/EmployeeGetByCriteria'
import { type EmployeeFilters } from '../../application/createEmployeeQueryParams'

const repository = new EmployeeGetAllService()
const getAll = new EmployeeGetByCriteria(repository)

/**
 * A React Query hook for fetching all employee data based on provided filters.
 * It uses `EmployeeGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching employees.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
export const useGetAllEmployees = (query: EmployeeFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['employees', query],
		queryFn: () => getAll.search(query),
		staleTime: 5 * 1000
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
