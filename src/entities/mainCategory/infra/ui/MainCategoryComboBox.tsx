import { memo, useMemo } from 'react'
import { useGetAllMainCategory } from '@/entities/mainCategory/infra/hook/useGetAllMainCategory'
import { Combobox } from '@/shared/ui/Input/Combobox'

export const MainCategoryCombobox = memo(function ({
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
	readonly?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const { mainCategories, isLoading } = useGetAllMainCategory({})

	const options = useMemo(() => mainCategories?.data ?? [], [mainCategories])

	return (
		<>
			<Combobox
				id="mainCategory"
				label="Categoria"
				value={value}
				name={name}
				loading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				readOnly={readonly}
				onChangeValue={handleChange}
			/>
		</>
	)
})
