import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { SearchInput } from '@/components/Input/Search'
import { useGetAllCentroCosto } from '@/core/employee/centroCosto/infra/hook/useGetAllCentroCosto'
import { type CentroCostoFilters } from '@/core/employee/centroCosto/application/createCentroCostoQueryParams'
import { type CentroCostoDto } from '@/core/employee/centroCosto/domain/dto/CentroCosto.dto'

export function CentroCostoSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: CentroCostoFilters = useMemo(() => {
		return {
			...(debouncedSearch
				? { name: debouncedSearch, id: debouncedSearch }
				: { pageSize: 10 }),
			orderBy: 'id'
		}
	}, [debouncedSearch])

	const { centroCostos, isLoading } = useGetAllCentroCosto(query)

	const options = useMemo(() => centroCostos?.data ?? [], [centroCostos])

	const handleValue = (value: string) => {
		setValue(value)
	}

	const displayAccessorFunction = (option: CentroCostoDto) => {
		return `${option.id} - ${option.name}`
	}
	return (
		<SearchInput
			id="centroCosto-search-name"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/centrocosto/edit/${value}`}
			name="centroCostoSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			displayAccessor={displayAccessorFunction}
			title="Búsqueda nombre de Centro de costo"
		/>
	)
}
