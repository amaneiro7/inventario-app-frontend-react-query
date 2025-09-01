import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { StatusEnum } from '../../domain/value-object/ShipmentStatus'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

interface ShipmentStatusComboboxProps {
	mode?: FormMode
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}

/**
 * `ShipmentStatusCombobox` is a component that provides a dropdown for filtering employees
 * by their employment status (active, inactive, or all).
 */
export function ShipmentStatusCombobox({
	mode,
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: ShipmentStatusComboboxProps) {
	const options = useMemo(() => {
		// Obtenemos todos los estados posibles del Enum.
		let availableStatuses = Object.values(StatusEnum)

		// Si el modo es 'add', filtramos para dejar solo las opciones permitidas.
		if (mode === 'add') {
			availableStatuses = availableStatuses.filter(
				status => status === StatusEnum.PENDING || status === StatusEnum.IN_TRANSIT
			)
		}

		// El resto de la lógica para dar formato a los nombres se mantiene igual.
		return availableStatuses.map(stat => {
			const id = stat as string
			const name = id
				.split('_')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')

			return {
				id,
				name
			}
		})
	}, [mode])
	return (
		<>
			<Combobox
				id="shipmentStatus"
				label="Estatus"
				value={value}
				name={name}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={(name, value) => {
					handleChange(name, value)
				}}
				readOnly={readonly}
			/>
		</>
	)
}
