import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { SearchInput } from '@/shared/ui/Input/Search'
import { useGetAllLocations } from '@/entities/locations/locations/infra/hook/useGetAllLocation'
import { type LocationFilters } from '@/entities/locations/locations/application/CreateLocationQueryParams'

export function LocationSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: LocationFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { locations, isLoading } = useGetAllLocations(query)

	const options = useMemo(() => locations?.data ?? [], [locations])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="location-search-name"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/location/edit/${value}`}
			name="locationSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por ubicación"
			// renderOption={LocationRenderOption}
		/>
	)
}
