import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { EmployeeTypes } from '@/entities/employee/employee/domain/value-object/EmployeeType'
import { employeeTypeTranslations } from './employeeTypeTranslations'

interface EmployeeTypeComboboxProps {
	mode?: 'form' | 'list'
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	handleChange: (name: string, value: string | number) => void
}

/**
 * `EmployeeTypeCombobox` is a component that provides a dropdown for selecting employee types.
 * It uses predefined `EmployeeTypes` as options.
 */
export function EmployeeTypeCombobox({
	value = '',
	mode = 'form',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	handleChange
}: EmployeeTypeComboboxProps) {
	const options = useMemo(() => {
		// Obtenemos todos los estados posibles del Enum.
		let availableTypes = Object.values(EmployeeTypes)

		// Si el modo es 'form', filtramos para dejar solo las opciones permitidas.
		if (mode === 'form') {
			availableTypes = availableTypes.filter(types => types !== EmployeeTypes.SERVICE)
		}

		// El resto de la lógica para dar formato a los nombres se mantiene igual.
		return availableTypes.map(type => {
			const id = type as string
			const name = employeeTypeTranslations[type] ?? id

			return {
				id,
				name
			}
		})
	}, [mode])
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
				isLoading={isLoading}
				errorMessage={error}
				searchField={false}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
}
