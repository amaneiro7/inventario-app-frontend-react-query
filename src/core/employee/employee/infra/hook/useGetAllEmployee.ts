import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { EmployeeGetAllService } from '@/core/employee/employee/infra/service/employeeGetAll.service'
import { EmployeeGetByCriteria } from '@/core/employee/employee/application/EmployeeGetByCriteria'
import { type EmployeeFilters } from '../../application/createEmployeeQueryParams'

export const useGetAllEmployees = (query: EmployeeFilters) => {
	const repository = useMemo(() => new EmployeeGetAllService(), [])
	const getAll = useMemo(() => new EmployeeGetByCriteria(repository), [repository])

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
