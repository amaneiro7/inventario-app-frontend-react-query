import { useMemo, useState } from 'react'
import { useGetAllEmployees } from '@/entities/employee/employee/infra/hook/useGetAllEmployee'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import type { EmployeeFilters } from '@/entities/employee/employee/application/createEmployeeQueryParams'

export const useEmployeeSearch = () => {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: EmployeeFilters = useMemo(() => {
		return {
			...(debouncedSearch
				? { userName: debouncedSearch, name: debouncedSearch, lastName: debouncedSearch }
				: { pageSize: 10 }),
			orderBy: 'userName'
		}
	}, [debouncedSearch])

	const { data: employees, isLoading } = useGetAllEmployees(query)

	const options = useMemo(() => employees?.data ?? [], [employees])

	return {
		searchValue,
		setSearchValue,
		value,
		setValue,
		options,
		isLoading
	}
}
