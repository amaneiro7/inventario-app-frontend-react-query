import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { SearchInput } from '@/components/Input/Search'
import { useGetAllCity } from '@/core/locations/city/infra/hook/useGetAllCity'
import { type CityFilters } from '@/core/locations/city/application/createCityQueryParams'

export function CitySearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: CityFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { cities, isLoading } = useGetAllCity(query)

	const options = useMemo(() => cities?.data ?? [], [cities])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="city-search-name"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/city/edit/${value}`}
			name="citySearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda ciudad"
		/>
	)
}
