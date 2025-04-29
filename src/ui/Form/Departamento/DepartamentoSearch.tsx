import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { SearchInput } from '@/components/Input/Search'
import { useGetAllDepartamento } from '@/core/employee/departamento/infra/hook/useGetAllDepartamento'
import { type DepartamentoFilters } from '@/core/employee/departamento/application/createDepartamentoQueryParams'

export function DepartamentoSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: DepartamentoFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { departamentos, isLoading } = useGetAllDepartamento(query)

	const options = useMemo(() => departamentos?.data ?? [], [departamentos])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="departamento-search-name"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/departamento/edit/${value}`}
			name="departamentoSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por departamento"
			// renderOption={DepartamentoRenderOption}
		/>
	)
}
