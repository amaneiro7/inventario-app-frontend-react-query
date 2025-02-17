import { lazy, memo, useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { useGetAllEmployees } from '@/hooks/getAll/useGetAllEmployee'
import { type EmployeeFilters } from '@/core/employee/employee/application/EmployeeGetByCriteria'

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
	// Se crea un estado para la consulta
	const [query, setQuery] = useState<EmployeeFilters>({
		options: {
			id: value
		},
		pageSize: 10
	})
	// Se obtienen los empleados
	const { employees, isLoading } = useGetAllEmployees(query)
	const [inputValue, setInputValue] = useState('')
	// Se crea un estado para el valor de la búsqueda
	const [debouncedLocalSearch] = useDebounce(inputValue)

	useEffectAfterMount(() => {
		setQuery({
			options: {
				userName: debouncedLocalSearch,
				name: debouncedLocalSearch,
				lastName: debouncedLocalSearch
			},
			pageSize: debouncedLocalSearch === '' ? 10 : undefined
		})
	}, [debouncedLocalSearch])

	useEffect(() => {
		setQuery({
			options: {
				id: value
			}
		})
	}, [value])

	return (
		<>
			<ComboboxEmployee
				id="employee"
				value={value}
				label="Usuarios"
				inputValue={inputValue}
				name={name}
				loading={isLoading}
				options={employees?.data ?? []}
				onChangeValue={handleChange}
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
			/>
		</>
	)
})
