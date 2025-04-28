import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { SearchInput } from '@/components/Input/Search'
import { useGetAllProcessor } from '@/core/devices/features/processor/infra/hooks/useGetAllProcessors'
import { type ProcessorFilters } from '@/core/devices/features/processor/application/createProcessorQueryParams'

export function ProcessorSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: ProcessorFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { processor, isLoading } = useGetAllProcessor(query)

	const options = useMemo(() => processor?.data ?? [], [processor])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			search={searchValue}
			handleChange={value => {
				setSearchValue(value.toUpperCase().trim())
			}}
			url={`/form/processors/edit/${value}`}
			name="processorSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por Number Model"
		/>
	)
}
