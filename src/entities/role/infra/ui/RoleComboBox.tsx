import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { useGetAllRoles } from '@/entities/role/infra/hook/useGetAllRole'

interface RoleComboboxProps {
	/**
	 * The currently selected role ID.
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
	 * @param value - The new selected value (role ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `RoleCombobox` is a functional component that provides a searchable combobox for selecting roles.
 * It fetches role data and displays it in a dropdown.
 */
export function RoleCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: RoleComboboxProps) {
	const { data: roles, isLoading } = useGetAllRoles({})

	const options = useMemo(() => roles?.data ?? [], [roles])

	return (
		<>
			<Combobox
				id="role"
				label="Roles"
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
				readOnly={readonly}
			/>
		</>
	)
}