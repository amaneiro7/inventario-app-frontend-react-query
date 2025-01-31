import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { EmployeeGetAllService } from '@/core/employee/employee/infra/employeeGetAll.service'
import {
	EmployeeFilters,
	EmployeeGetByCriteria
} from '@/core/employee/employee/application/EmployeeGetByCriteria'

export const useGetAllEmployees = (query: EmployeeFilters) => {
	const repository = useMemo(() => new EmployeeGetAllService(), [])
	const getAll = useMemo(() => new EmployeeGetByCriteria(repository), [repository])
	console.log(query)
	const {
		isLoading,
		isError,
		data: employees
	} = useQuery({
		queryKey: ['employees', query.options],
		queryFn: () => getAll.search(query)
	})

	return {
		isLoading,
		isError,
		employees
	}
}
