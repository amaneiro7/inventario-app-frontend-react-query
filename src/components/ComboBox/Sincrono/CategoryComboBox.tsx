import { lazy, memo, useMemo, useState } from 'react'
import { useGetAllCategory } from '@/core/category/infra/hook/useGetAllCategory'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { type CategoryFilters } from '@/core/category/application/CreateCategoryQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
export const CategoryCombobox = memo(function ({
	value = '',
	name,
	mainCategoryId,
	error = '',
	required = false,
	disabled = false,
	handleChange
}: {
	value?: string
	name: string
	mainCategoryId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: CategoryFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 }),
			...(value ? { id: value } : {}),
			mainCategoryId
		}
	}, [debouncedSearch, value, mainCategoryId])

	const { categories, isLoading } = useGetAllCategory(query)

	const options = useMemo(() => categories?.data ?? [], [categories])

	return (
		<>
			<Combobox
				id="category"
				label="SubCategoria"
				value={value}
				inputValue={inputValue}
				name={name}
				loading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onInputChange={value => {
					setInputValue(value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
})
