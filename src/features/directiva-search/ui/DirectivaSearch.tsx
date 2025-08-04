import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { SearchInput } from '@/shared/ui/Input/Search'
import { useGetAllDirectiva } from '@/entities/employee/directiva/infra/hook/useGetAllDirectiva'
import { type DirectivaFilters } from '@/entities/employee/directiva/application/createDirectivaQueryParams'

export function DirectivaSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: DirectivaFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { directivas, isLoading } = useGetAllDirectiva(query)

	const options = useMemo(() => directivas?.data ?? [], [directivas])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="directiva-search-name"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/directiva/edit/${value}`}
			name="directivaSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por nombre"
		/>
	)
}
