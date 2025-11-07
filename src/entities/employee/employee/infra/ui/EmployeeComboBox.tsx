import { memo, useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllEmployees } from '@/entities/employee/employee/infra/hook/useGetAllEmployee'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { EmployeeRenderOption } from '@/shared/ui/Input/Combobox/RenderOption/EmployeeRenderOption'
import { type EmployeeFilters } from '@/entities/employee/employee/application/createEmployeeQueryParams'

interface EmployeeComboboxProps {
	value?: string
	name: string
	label?: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	handleChange: (name: string, value: string | number) => void
}

export const EmployeeCombobox = memo(function ({
	value = '',
	name,
	error = '',
	label = 'Usuarios',
	required = false,
	disabled = false,
	isLoading = false,
	readonly = false,
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
	const { data, isLoading: loading } = useGetAllEmployees(query)

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="employee"
				label={label}
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={loading}
				isLoading={isLoading}
				options={options}
				readOnly={readonly}
				onChangeValue={handleChange}
				onInputChange={setInputValue}
				displayAccessor="userName"
				renderOption={EmployeeRenderOption}
			/>
		</>
	)
})
