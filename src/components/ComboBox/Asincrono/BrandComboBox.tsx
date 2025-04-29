import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllBrands } from '@/core/brand/infra/hooks/useGetAllBrand'
import { type BrandFilters } from '@/core/brand/application/createBrandQueryParams'
import { Combobox } from '@/components/Input/Combobox'

export function BrandCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: BrandFilters = useMemo(() => {
		return {
			...(value ? { id: value } : {}),
			...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch, value])

	const { brands, isLoading } = useGetAllBrands(query)

	const options = useMemo(() => brands?.data ?? [], [brands])

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
