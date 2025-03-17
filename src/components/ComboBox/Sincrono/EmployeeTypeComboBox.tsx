import { useMemo } from 'react'
import { Combobox } from '@/components/Input/Combobox'
import { EmployeeTypes } from '@/core/employee/employee/domain/value-object/EmployeeType'

export function EmployeeTypeCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const options = useMemo(() => {
		return Object.values(EmployeeTypes).flatMap(opt => ({ id: opt }))
	}, [EmployeeTypes])
	return (
		<>
			<Combobox
				id="employeeType"
				label="Tipo de usuario"
				value={value}
				name={name}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={handleChange}
				readOnly={readonly}
				displayAccessor="id"
			/>
		</>
	)
}
