import { lazy, memo, useMemo, useState } from 'react'
import { useGetAllCategory } from '@/hooks/getAll/useGetAllCategory'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { type CategoryFilters } from '@/core/category/application/CreateCategoryQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
export const CategoryCombobox = memo(function ({
	value = '',
	name,
	mainCategoryId,
	handleChange
}: {
	value?: string
	name: string
	mainCategoryId?: string
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
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
})
