import { memo, useMemo, useState } from 'react'
import { useGetAllCategory } from '@/core/category/infra/hook/useGetAllCategory'
import { useFilterOptions } from '@/hooks/useFilterOptions'
import { Combobox } from '@/components/Input/Combobox'
import { type CategoryFilters } from '@/core/category/application/CreateCategoryQueryParams'

export const CategoryCombobox = memo(function ({
	value = '',
	name,
	mainCategoryId,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	mainCategoryId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const query: CategoryFilters = useMemo(
		() => ({
			mainCategoryId
		}),
		[value, mainCategoryId]
	)

	const { categories, isLoading } = useGetAllCategory(query)

	const options = useMemo(() => categories?.data ?? [], [categories])

	const filteredOptions = useFilterOptions({ options, inputValue })

	return (
		<>
			<Combobox
				id="category"
				label="SubCategoria"
				value={value}
				name={name}
				loading={isLoading}
				options={filteredOptions}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				inputValue={inputValue}
				onInputChange={value => {
					setInputValue(value)
				}}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
})
