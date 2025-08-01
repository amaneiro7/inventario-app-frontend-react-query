import { useQuery } from '@tanstack/react-query'
import { EmployeeGetAllService } from '@/entities/employee/employee/infra/service/employeeGetAll.service'
import { EmployeeGetByCriteria } from '@/entities/employee/employee/application/EmployeeGetByCriteria'
import { type EmployeeFilters } from '../../application/createEmployeeQueryParams'

const repository = new EmployeeGetAllService()
const getAll = new EmployeeGetByCriteria(repository)
export const useGetAllEmployees = (query: EmployeeFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: employees
	} = useQuery({
		queryKey: ['employees', query],
		queryFn: () => getAll.search(query),
		staleTime: 5 * 1000
	})

	return {
		isLoading,
		refetch,
		isError,
		employees
	}
}
