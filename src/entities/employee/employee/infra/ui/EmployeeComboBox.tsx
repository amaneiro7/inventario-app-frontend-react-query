import { memo, useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllEmployees } from '@/entities/employee/employee/infra/hook/useGetAllEmployee'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { EmployeeRenderOption } from '@/shared/ui/Input/Combobox/RenderOption/EmployeeRenderOption'
import { type EmployeeFilters } from '@/entities/employee/employee/application/createEmployeeQueryParams'

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
