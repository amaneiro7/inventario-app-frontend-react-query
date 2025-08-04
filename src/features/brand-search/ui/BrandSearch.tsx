import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { SearchInput } from '@/shared/ui/Input/Search'
import { useGetAllBrands } from '@/entities/brand/infra/hooks/useGetAllBrand'
import { type BrandFilters } from '@/entities/brand/application/createBrandQueryParams'

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
			id="brand-search-form"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/brand/edit/${value}`}
			name="brandSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda nombre de marca"
		/>
	)
}
