import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { SearchInput } from '@/components/Input/Search'
import { useGetAllCentroTrabajo } from '@/core/employee/centroTrabajo/infra/hook/useGetAllCentroTrabajo'
import { type CentroTrabajoFilters } from '@/core/employee/centroTrabajo/application/createCentroTrabajoQueryParams'
import { type CentroTrabajoDto } from '@/core/employee/centroTrabajo/domain/dto/CentroTrabajo.dto'

export function CentroTrabajoSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: CentroTrabajoFilters = useMemo(() => {
		return {
			...(debouncedSearch
				? { name: debouncedSearch, id: debouncedSearch }
				: { pageSize: 10 }),
			orderBy: 'id'
		}
	}, [debouncedSearch])

	const { centroTrabajos, isLoading } = useGetAllCentroTrabajo(query)

	const options = useMemo(() => centroTrabajos?.data ?? [], [centroTrabajos])

	const handleValue = (value: string) => {
		setValue(value)
	}

	const displayAccessorFunction = (option: CentroTrabajoDto) => {
		return `${option.id} - ${option.name}`
	}
	return (
		<SearchInput
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/centroTrabajo/edit/${value}`}
			name="centroTrabajoSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			displayAccessor={displayAccessorFunction}
			title="Búsqueda nombre de Centro de Trabajo"
		/>
	)
}
