import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllBrands } from '@/entities/brand/infra/hooks/useGetAllBrand'
import { type BrandFilters } from '@/entities/brand/application/createBrandQueryParams'
import { Combobox } from '@/shared/ui/Input/Combobox'

export function BrandCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	categoryId = '',
	mainCategoryId = '',
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	categoryId?: string
	mainCategoryId?: string
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: BrandFilters = useMemo(() => {
		return {
			...(value ? { id: value } : {}),
			...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 }),
			...(value || debouncedSearch
				? { categoryId: undefined, mainCategoryId: undefined }
				: { categoryId, mainCategoryId })
		}
	}, [debouncedSearch, value, mainCategoryId, categoryId])

	const { data, isLoading } = useGetAllBrands(query)

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="brandId"
				label="Marca"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={options}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
}
