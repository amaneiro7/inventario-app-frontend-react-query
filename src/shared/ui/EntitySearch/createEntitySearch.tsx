import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { SearchInput } from '@/shared/ui/Input/Search'
import { type Highlight } from '../Input/Combobox/RenderOption/RenderComboboxOption'

export interface EntitySearchProps<T extends { id: string; name: string }> {
	entityName: string
	queryHook: (query: any) => { data: { data: T[] } | undefined; isLoading: boolean }
	urlPrefix: string
	searchField: string
	displayAccessor?: keyof T | ((option: T) => string)
	renderOption?: ({
		option,
		inputValue,
		highlight
	}: {
		option: T
		inputValue?: string
		highlight: Highlight<T>
	}) => React.ReactNode
	title: string
}

/**
 * Fábrica para crear un componente EntitySearch vinculado a un hook específico.
 * Esto evita el error de pasar hooks como props.
 */
export function createEntitySearch<T extends { id: string; name: string }>(
	queryHook: (query: any) => { data: { data: T[] } | undefined; isLoading: boolean }
) {
	return function EntitySearchComponent({
		entityName,
		urlPrefix,
		searchField,
		displayAccessor = 'name',
		renderOption,
		title
	}: Omit<EntitySearchProps<T>, 'queryHook'>) {
		const [searchValue, setSearchValue] = useState('')
		const [debouncedSearch] = useDebounce(searchValue, 250)
		const [value, setValue] = useState('')

		const query = useMemo(() => {
			return {
				...(debouncedSearch ? { [searchField]: debouncedSearch } : { pageSize: 10 })
			}
		}, [debouncedSearch, searchField])

		const { data, isLoading } = queryHook(query)

		const options = useMemo(() => data?.data ?? [], [data])

		const handleValue = (value: string) => {
			setValue(value)
		}
		return (
			<SearchInput
				id={`${entityName}-search`}
				search={searchValue}
				handleChange={setSearchValue}
				url={`${urlPrefix}/${value}`}
				name={`${entityName}Search`}
				onChangeValue={handleValue}
				loading={isLoading}
				options={options}
				value={value}
				title={title}
				displayAccessor={displayAccessor as any}
				renderOption={renderOption as any}
			/>
		)
	}
}
