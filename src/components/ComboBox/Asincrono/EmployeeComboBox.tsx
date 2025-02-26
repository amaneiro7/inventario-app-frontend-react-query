import { lazy, memo, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllEmployees } from '@/core/employee/employee/infra/hook/useGetAllEmployee'
import { type EmployeeFilters } from '@/core/employee/employee/application/createEmployeeQueryParams'

const ComboboxEmployee = lazy(async () =>
	import('@/components/Input/Combobox/ComboboxEmployee').then(m => ({
		default: m.ComboboxEmployee
	}))
)
export const EmployeeCombobox = memo(function ({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedLocalSearch] = useDebounce(inputValue)

	const query: EmployeeFilters = useMemo(() => {
		return {
			...(debouncedLocalSearch
				? {
						name: debouncedLocalSearch,
						userName: debouncedLocalSearch,
						lastName: debouncedLocalSearch
				  }
				: { pageSize: 10 }),
			...(value ? { id: value } : {})
		}
	}, [debouncedLocalSearch, value])

	// Se obtienen los empleados
	const { employees, isLoading } = useGetAllEmployees(query)

	const options = useMemo(() => employees?.data ?? [], [employees])

	return (
		<>
			<ComboboxEmployee
				id="employee"
				value={value}
				label="Usuarios"
				inputValue={inputValue}
				name={name}
				loading={isLoading}
				options={options}
				onChangeValue={handleChange}
				onInputChange={value => {
					setInputValue(value)
				}}
			/>
		</>
	)
})
