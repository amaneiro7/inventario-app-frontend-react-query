import { EmployeeFilters } from '@/core/employee/employee/application/EmployeeGetByCriteria'
import { useGetAllEmployees } from '@/hooks/useEmployee'
import { useState } from 'react'
import { Input } from '../Input/Input'

export function EmployeeCombobox() {
	const [value, setValue] = useState('')
	const [query, setQuery] = useState<EmployeeFilters>({ options: {} })
	const { employees, isLoading, isError } = useGetAllEmployees(query)
	return (
		<div>
			{isLoading && <p>...Loading</p>}
			<Input
				label="Buscar por nombre"
				value={value}
				onChange={e => {
					const { value } = e.target
					setValue(value)
					setQuery(prev => ({
						...prev,
						options: {
							name: value,
							isStillWorking: true
						}
					}))
				}}
			/>
			{isError && <p>Error</p>}
			{!isLoading && !isError && employees?.data.map(e => <p>{e.name}</p>)}
		</div>
	)
}
