import { memo, useMemo } from 'react'
import { useGetAllMemoryRamType } from '@/entities/model/memoryRamType/infra/hook/useMemoryRamType'
import { Combobox } from '@/shared/ui/Input/Combobox'

interface MemoryRamTypeComboboxProps {
	/**
	 * The currently selected memory RAM type ID.
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
	 * @param value - The new selected value (memory RAM type ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `MemoryRamTypeCombobox` is a memoized functional component that provides a searchable combobox for selecting memory RAM types.
 * It fetches memory RAM type data and displays it in a dropdown.
 */
export const MemoryRamTypeCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	handleChange
}: MemoryRamTypeComboboxProps) {
	const { data: memoryRamTypes, isLoading } = useGetAllMemoryRamType({})

	const options = useMemo(() => memoryRamTypes?.data ?? [], [memoryRamTypes])

	return (
		<>
			<Combobox
				id="MemoryRamType"
				label="Tipo de memoria"
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