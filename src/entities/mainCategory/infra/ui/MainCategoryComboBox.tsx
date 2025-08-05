import { memo, useMemo } from 'react'
import { useGetAllMainCategory } from '@/entities/mainCategory/infra/hook/useGetAllMainCategory'
import { Combobox } from '@/shared/ui/Input/Combobox'

interface MainCategoryComboboxProps {
	/**
	 * The currently selected main category ID.
	 */
	value?: string
	/**
	 * The name of the input field.
	 */
	name: string
	/**
	 * Error message to display, if any.
	 */
	error?: string
	/**
	 * Whether the input is required.
	 */
	required?: boolean
	/**
	 * Whether the input is disabled.
	 */
	disabled?: boolean
	/**
	 * Whether the input is read-only.
	 */
	readonly?: boolean
	/**
	 * Callback function triggered when the selected value changes.
	 * @param name - The name of the input field.
	 * @param value - The new selected value (main category ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `MainCategoryCombobox` is a memoized functional component that provides a searchable combobox for selecting main categories.
 * It fetches main category data and displays it in a dropdown.
 */
export const MainCategoryCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: MainCategoryComboboxProps) {
	const { data: mainCategories, isLoading } = useGetAllMainCategory({})

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