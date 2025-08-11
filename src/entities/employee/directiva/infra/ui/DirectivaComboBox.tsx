import { memo, useMemo } from 'react'
import { useGetAllDirectiva } from '@/entities/employee/directiva/infra/hook/useGetAllDirectiva'
import { Combobox } from '@/shared/ui/Input/Combobox'

interface DirectivaComboboxProps {
	/**
	 * The currently selected directiva ID.
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
	isLoading?: boolean
	/**
	 * Whether the input is loading.
	 */
	readonly?: boolean
	/**
	 * Callback function triggered when the selected value changes.
	 * @param name - The name of the input field.
	 * @param value - The new selected value (directiva ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `DirectivaCombobox` is a memoized functional component that provides a searchable combobox for selecting directivas.
 * It fetches directiva data and displays it in a dropdown.
 */
export const DirectivaCombobox = memo(
	({
		value = '',
		name,
		error = '',
		required = false,
		disabled = false,
		readonly = false,
		isLoading = false,
		handleChange
	}: DirectivaComboboxProps) => {
		const { data, isLoading: loading } = useGetAllDirectiva({})

		const options = useMemo(() => data?.data ?? [], [data])

		return (
			<>
				<Combobox
					id="directiva"
					label="Directiva"
					value={value}
					name={name}
					isLoading={isLoading}
					loading={loading}
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
	}
)
