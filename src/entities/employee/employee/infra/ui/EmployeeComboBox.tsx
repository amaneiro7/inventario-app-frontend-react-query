import { memo, useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllEmployees } from '@/entities/employee/employee/infra/hook/useGetAllEmployee'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { EmployeeRenderOption } from '@/shared/ui/Input/Combobox/RenderOption/EmployeeRenderOption'
import { type EmployeeFilters } from '@/entities/employee/employee/application/createEmployeeQueryParams'

interface EmployeeComboboxProps {
	/**
	 * The currently selected employee ID.
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
	 * @param value - The new selected value (employee ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `EmployeeCombobox` is a memoized component that provides a searchable combobox for selecting employees.
 * It fetches employee data based on user input and displays it in a dropdown.
 */
export const EmployeeCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	handleChange
}: EmployeeComboboxProps) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedLocalSearch] = useDebounce(inputValue)

	const query: EmployeeFilters = useMemo(() => {
		return {
			...(value ? { id: value } : {}),
			...(debouncedLocalSearch
				? {
						id: undefined,
						name: debouncedLocalSearch,
						userName: debouncedLocalSearch,
						lastName: debouncedLocalSearch
					}
				: { pageSize: 10 })
		}
	}, [debouncedLocalSearch, value])

	// Fetch employee data based on the constructed query
	const { data, isLoading } = useGetAllEmployees(query)

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="employee"
				label="Usuarios"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={options}
				onChangeValue={handleChange}
				onInputChange={setInputValue}
				displayAccessor="userName"
				renderOption={EmployeeRenderOption}
			/>
		</>
	)
})