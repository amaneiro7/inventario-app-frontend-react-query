import { memo } from 'react'
import { SearchInput } from '@/shared/ui/Input/Search'
import { EmployeeRenderOption } from '@/shared/ui/Input/Combobox/RenderOption/EmployeeRenderOption'
import { useEmployeeSearch } from '../model/useEmployeeSearch'

export const EmployeeSearch = memo(() => {
	const { isLoading, options, searchValue, setSearchValue, value, setValue } = useEmployeeSearch()
	return (
		<SearchInput
			id="employee-search-username"
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
