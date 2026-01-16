import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { EmployeeTypes } from '@/entities/employee/employee/domain/value-object/EmployeeType'
import { employeeTypeTranslations } from './employeeTypeTranslations'
import { FormMode } from '@/shared/lib/hooks/useGetFormMode'

interface EmployeeTypeComboboxProps {
	mode?: 'form' | 'list'
	formMode?: FormMode
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
	formMode,
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	handleChange
}: EmployeeTypeComboboxProps) {
	const isInputDisabled = useMemo(() => {
		if (readonly) return true
		if (mode === 'form' && formMode === 'edit') {
			return [EmployeeTypes.SERVICE, EmployeeTypes.GENERIC, EmployeeTypes.REGULAR].includes(
				value as EmployeeTypes
			)
		}
		return false
	}, [readonly, mode, formMode, value])

	const options = useMemo(() => {
		// Obtenemos todos los estados posibles del Enum.
		let availableTypes = Object.values(EmployeeTypes)

		// Si el modo es 'form', filtramos para dejar solo las opciones permitidas.
		if (mode === 'form') {
			if (formMode === 'add') {
				availableTypes = availableTypes.filter(types => types !== EmployeeTypes.SERVICE)
			} else if (formMode === 'edit') {
				if (value === EmployeeTypes.CONTRACTOR || value === EmployeeTypes.APPRENTICE) {
					availableTypes = availableTypes.filter(
						types => types === value || types === EmployeeTypes.REGULAR
					)
				}
			}
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
	}, [mode, formMode, value])
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
				readOnly={isInputDisabled}
			/>
		</>
	)
}
