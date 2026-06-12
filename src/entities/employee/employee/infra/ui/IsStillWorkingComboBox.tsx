import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'

interface IsStillWorkingComboboxProps {
	/**
	 * The currently selected value for the "is still working" status.
	 * Can be 'true', 'false', or 'all' (or null/undefined).
	 */
	value?: string | null
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
	 * @param value - The new selected value ('true', 'false', or '').
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `IsStillWorkingCombobox` is a component that provides a dropdown for filtering employees
 * by their employment status (active, inactive, or all).
 */
export function IsStillWorkingCombobox({
	value,
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: IsStillWorkingComboboxProps) {
	const options = useMemo(() => {
		return [
			{ id: 'all', name: 'Todos' },
			{ id: 'true', name: 'Activos' },
			{ id: 'false', name: 'inactivos' }
		]
	}, [])
	return (
		<>
			<Combobox
				id="isStillWorking"
				label="Filtrar por estado"
				value={value ?? 'all'}
				name={name}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={(name, value) => {
					const newValue = value === 'all' ? '' : value
					handleChange(name, newValue)
				}}
				readOnly={readonly}
			/>
		</>
	)
}
