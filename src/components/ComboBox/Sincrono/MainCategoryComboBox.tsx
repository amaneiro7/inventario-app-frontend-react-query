import { lazy, memo, Suspense, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllMainCategory } from '@/hooks/getAll/useGetAllMainCategory'
import { type MainCategoryFilters } from '@/core/mainCategory/application/CreateMainCategoryQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
export const MainCategoryCombobox = memo(function ({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: MainCategoryFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 }),
			...(value ? { id: value } : {})
		}
	}, [debouncedSearch, value])

	const { mainCategories, isLoading } = useGetAllMainCategory(query)

	const options = useMemo(() => mainCategories?.data ?? [], [mainCategories])

	return (
		<Suspense>
			<Combobox
				id="mainCategory"
				label="Categoria"
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
		</Suspense>
	)
})
