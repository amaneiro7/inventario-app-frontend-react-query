import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { EmployeeTypes } from '@/entities/employee/employee/domain/value-object/EmployeeType'

interface EmployeeTypeComboboxProps {
	/**
	 * The currently selected employee type value.
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
	 * @param value - The new selected value (employee type).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `EmployeeTypeCombobox` is a component that provides a dropdown for selecting employee types.
 * It uses predefined `EmployeeTypes` as options.
 */
export function EmployeeTypeCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: EmployeeTypeComboboxProps) {
	const options = useMemo(() => {
		return Object.values(EmployeeTypes).flatMap(opt => ({ id: opt, name: opt.toUpperCase() }))
	}, [])
	return (
		<>
			<Combobox
				id="employeeType"
				label="Tipo de usuario"
				value={value}
				name={name}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
}