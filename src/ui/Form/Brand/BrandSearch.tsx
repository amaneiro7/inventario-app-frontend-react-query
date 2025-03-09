import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { SearchInput } from '@/components/Input/Search'
import { useGetAllBrands } from '@/core/brand/infra/hooks/useGetAllBrand'
import { type BrandFilters } from '@/core/brand/application/createBrandQueryParams'

export function BrandSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: BrandFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { brands, isLoading } = useGetAllBrands(query)

	const options = useMemo(() => brands?.data ?? [], [brands])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			search={searchValue}
			handleChange={value => {
				setSearchValue(value.toUpperCase().trim())
			}}
			url={`/brand/edit/${value}`}
			name="brandSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda nombre de marca"
		/>
	)
}
