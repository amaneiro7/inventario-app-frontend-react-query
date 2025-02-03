import { useMemo, useState } from 'react'
import { useGetAllCategory } from '@/hooks/getAll/useGetAllCategory'
import { Combobox } from '@/components/ComboBox/ComboBox'

export function CategoryCombobox({
	value,
	name,
	mainCategoryId,
	handleChange
}: {
	value: string
	name: string
	mainCategoryId?: string
	handleChange: (name: string, value: string) => void
}) {
	const { categories, isLoading } = useGetAllCategory({
		options: {
			id: value,
			mainCategoryId
		}
	})

	const initialValue = useMemo(() => {
		return categories?.data.find(category => category.id === value) ?? null
	}, [value, categories])
	const [inputValue, setInputValue] = useState('')

	return (
		<>
			<Combobox
				loading={isLoading}
				label="SubCategoria"
				value={initialValue}
				options={categories?.data ?? []}
				inputValue={inputValue}
				onChange={(_, newValue) => {
					handleChange(name, newValue?.id ?? '')
				}}
				onInputChange={(_, newInputValue, reason) => {
					if (reason === 'reset') return
					setInputValue(newInputValue)
				}}
			/>
		</>
	)
}
