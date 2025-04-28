import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { SearchInput } from '@/components/Input/Search'
import { useGetAllCargo } from '@/core/employee/cargo/infra/hook/useGetAllCargo'
import { type CargoFilters } from '@/core/employee/cargo/application/createCargoQueryParams'

export function CargoSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: CargoFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { cargos, isLoading } = useGetAllCargo(query)

	const options = useMemo(() => cargos?.data ?? [], [cargos])
	return (
		<SearchInput
			search={searchValue}
			handleChange={setSearchValue}
			url={`/form/cargo/edit/${value}`}
			name="cargoSearch"
			onChangeValue={setValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por Cargo"
			// renderOption={CargoRenderOption}
		/>
	)
}
