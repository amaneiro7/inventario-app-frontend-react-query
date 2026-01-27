import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { StatusEnum } from '../../domain/value-object/ShipmentStatus'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { getShipmentsStatusOptions } from './getShipmentsStatusOptions'

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
		let availableStatuses = getShipmentsStatusOptions()

		// Si el modo es 'add', filtramos para dejar solo las opciones permitidas.
		if (mode === 'add') {
			availableStatuses = availableStatuses.filter(
				status => status.id === StatusEnum.PENDING || status.id === StatusEnum.IN_TRANSIT
			)
		}

		// El resto de la lógica para dar formato a los nombres se mantiene igual.
		return availableStatuses
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
