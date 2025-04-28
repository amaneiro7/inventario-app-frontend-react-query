import { memo, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { SearchInput } from '@/components/Input/Search'
import { useGetAllEmployees } from '@/core/employee/employee/infra/hook/useGetAllEmployee'
import { EmployeeRenderOption } from '@/components/Input/Combobox/RenderOption/EmployeeRenderOption'
import { type EmployeeFilters } from '@/core/employee/employee/application/createEmployeeQueryParams'

export const EmployeeSearch = memo(() => {
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

	const { employees, isLoading } = useGetAllEmployees(query)

	const options = useMemo(() => employees?.data ?? [], [employees])

	return (
		<SearchInput
			search={searchValue}
			handleChange={setSearchValue}
			url={`/form/employee/edit/${value}`}
			name="employeeSearch"
			onChangeValue={setValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por usuario"
			displayAccessor="userName"
			renderOption={EmployeeRenderOption}
		/>
	)
})

EmployeeSearch.displayName = 'EmployeeSearch'
