import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { SearchInput } from '@/shared/ui/Input/Search'
import { useGetAllRegion } from '@/entities/locations/region/infra/hook/useGetAllRegion'
import { type RegionFilters } from '@/entities/locations/region/application/createRegionQueryParams'

export function RegionSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: RegionFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { regions, isLoading } = useGetAllRegion(query)

	const options = useMemo(() => regions?.data ?? [], [regions])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="region-search-name"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/region/edit/${value}`}
			name="regionSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Buscar región por nombre"
		/>
	)
}
