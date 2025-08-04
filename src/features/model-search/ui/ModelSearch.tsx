import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { SearchInput } from '@/shared/ui/Input/Search'
import { useGetAllModel } from '@/entities/model/models/infra/hook/useGetAllModel'
import { type ModelFilters } from '@/entities/model/models/application/CreateModelsQueryParams'

export function ModelSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: ModelFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { models, isLoading } = useGetAllModel({ query })

	const options = useMemo(() => models?.data ?? [], [models])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="model-search-name"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/model/edit/${value}`}
			name="modelSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por nombre de modelo"
		/>
	)
}
