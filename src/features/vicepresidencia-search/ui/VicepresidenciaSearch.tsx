import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { SearchInput } from '@/shared/ui/Input/Search'
import { useGetAllVicepresidencias } from '@/entities/employee/vicepresidencia/infra/hook/useGetAllVicepresidencia'
import { type VicepresidenciaFilters } from '@/entities/employee/vicepresidencia/application/createVicepresidenciaQueryParams'

export function VicepresidenciaSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: VicepresidenciaFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { vicepresidencias, isLoading } = useGetAllVicepresidencias(query)

	const options = useMemo(() => vicepresidencias?.data ?? [], [vicepresidencias])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="vicepresidencia-search-name"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/vicepresidencia/edit/${value}`}
			name="vicepresidenciaSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por nombre de vicepresidencia"
		/>
	)
}
