import { memo, useMemo } from 'react'

import { Combobox } from '@/shared/ui/Input/Combobox'
import { useGetAllInputType } from '@/entities/model/inputType/infra/hook/useInputType'

interface InputTypeComboboxProps {
	/**
	 * The currently selected input type ID.
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
	 * Callback function triggered when the selected value changes.
	 * @param name - The name of the input field.
	 * @param value - The new selected value (input type ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `InputTypeCombobox` is a memoized functional component that provides a searchable combobox for selecting input types.
 * It fetches input type data and displays it in a dropdown.
 */
export const InputTypeCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	handleChange
}: InputTypeComboboxProps) {
	const { data: inputTypes, isLoading } = useGetAllInputType({})

	const options = useMemo(() => inputTypes?.data ?? [], [inputTypes])

	return (
		<>
			<Combobox
				id="InputType"
				label="Tipo de Entrada"
				value={value}
				name={name}
				loading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={handleChange}
			/>
		</>
	)
})