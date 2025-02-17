import { lazy, memo, useEffect, useState } from 'react'
import { useGetAllCategory } from '@/hooks/getAll/useGetAllCategory'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { type CategoryFilters } from '@/core/category/application/CategoryGetByCriteria'

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
	const [query, setQuery] = useState<CategoryFilters>({
		options: {
			id: value,
			mainCategoryId
		}
	})
	const { categories, isLoading } = useGetAllCategory(query)
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)
	useEffectAfterMount(() => {
		setQuery({
			options: {
				name: debouncedSearch,
				mainCategoryId
			},
			pageSize: debouncedSearch === '' ? 10 : undefined
		})
	}, [debouncedSearch])

	useEffect(() => {
		setQuery({
			options: {
				id: value,
				mainCategoryId
			}
		})
	}, [value, mainCategoryId])

	return (
		<>
			<Combobox
				id="category"
				label="SubCategoria"
				value={value}
				inputValue={inputValue}
				name={name}
				loading={isLoading}
				options={categories?.data ?? []}
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
})
