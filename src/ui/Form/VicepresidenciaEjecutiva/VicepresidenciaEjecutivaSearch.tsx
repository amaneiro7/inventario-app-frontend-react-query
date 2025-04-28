import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { SearchInput } from '@/components/Input/Search'
import { useGetAllVicepresidenciaEjecutivas } from '@/core/employee/vicepresidenciaEjecutiva/infra/hook/useGetAllVicepresidenciaEjecutiva'
import { type VicepresidenciaEjecutivaFilters } from '@/core/employee/vicepresidenciaEjecutiva/application/createVicepresidenciaEjecutivaQueryParams'

export function VicepresidenciaEjecutivaSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: VicepresidenciaEjecutivaFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { vicepresidenciaEjecutivas, isLoading } = useGetAllVicepresidenciaEjecutivas(query)

	const options = useMemo(
		() => vicepresidenciaEjecutivas?.data ?? [],
		[vicepresidenciaEjecutivas]
	)

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/vicepresidenciaEjecutiva/edit/${value}`}
			name="vicepresidenciaEjecutivaSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por nombre de vicepresidencia"
		/>
	)
}
