import { memo, useMemo, useState } from 'react'
import { useGetAllCategory } from '@/hooks/getAll/useGetAllCategory'
import { Combobox } from '@/components/ComboBox/Combobox'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { CategoryFilters } from '@/core/category/application/CategoryGetByCriteria'
import { useDebounce } from '@/hooks/utils/useDebounce'

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
	const [query, setQuery] = useState<CategoryFilters>({
		options: {
			id: value,
			mainCategoryId
		}
	})
	const { categories, isLoading } = useGetAllCategory(query)

	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)
	useEffectAfterMount(() => {
		setQuery({
			options: {
				name: debouncedSearch
			},
			pageSize: debouncedSearch === '' ? 10 : undefined
		})
	}, [debouncedSearch])

	console.log('value:', value)

	return (
		<>
			<Combobox
				id="category"
				label="SubCategoria"
				value={value}
				name={name}
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
				onChangeValue={handleChange}
				inputValue={inputValue}
				options={categories?.data ?? []}
			/>
		</>
	)
})
