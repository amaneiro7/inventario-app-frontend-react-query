import { useMemo } from 'react'
import { useGetAllStatus } from '@/entities/status/status/infra/hook/useGetAllStatus'
import { Combobox } from '@/shared/ui/Input/Combobox'

interface StatusComboboxProps {
	/**
	 * The currently selected status ID.
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
	isLoading?: boolean
	/**
	 * Callback function triggered when the selected value changes.
	 * @param name - The name of the input field.
	 * @param value - The new selected value (status ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `StatusCombobox` is a functional component that provides a searchable combobox for selecting statuses.
 * It fetches status data and displays it in a dropdown.
 */
export function StatusCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	handleChange
}: StatusComboboxProps) {
	const { data, isLoading: loading } = useGetAllStatus({})

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="status"
				label="Estatus"
				value={value}
				name={name}
				loading={loading}
				isLoading={isLoading}
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
