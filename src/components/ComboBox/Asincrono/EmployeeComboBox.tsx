import { memo, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllEmployees } from '@/core/employee/employee/infra/hook/useGetAllEmployee'
import { Combobox } from '@/components/Input/Combobox'
import { EmployeeRenderOption } from '@/components/Input/Combobox/RenderOption/EmployeeRenderOption'
import { type EmployeeFilters } from '@/core/employee/employee/application/createEmployeeQueryParams'

export const EmployeeCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
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

	// Se obtienen los empleados
	const { employees, isLoading } = useGetAllEmployees(query)

	const options = useMemo(() => employees?.data ?? [], [employees])

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
