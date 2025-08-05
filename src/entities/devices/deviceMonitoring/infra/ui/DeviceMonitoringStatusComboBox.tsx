import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { DeviceMonitoringStatuses } from '../../domain/value-object/Status'

/**
 * `DeviceMonitoringStatusCombobox`
 * @component
 * @description Componente Combobox para seleccionar el estado de monitoreo de un dispositivo.
 * Ofrece opciones como 'En línea', 'Fuera de línea', 'Nombre de host inconsistente' y 'Todos'.
 * @param {object} props - Las propiedades del componente.
 * @param {string | null} [props.value] - El valor seleccionado del estado de monitoreo.
 * @param {string} props.name - El nombre del campo del formulario.
 * @param {string} [props.error=''] - Mensaje de error a mostrar.
 * @param {'location' | 'device'} [props.type] - Tipo de monitoreo (ubicación o dispositivo) para ajustar las opciones.
 * @param {boolean} [props.required=false] - Indica si el campo es requerido.
 * @param {boolean} [props.disabled=false] - Indica si el campo está deshabilitado.
 * @param {boolean} [props.readonly=false] - Indica si el campo es de solo lectura.
 * @param {(name: string, value: string | number) => void} props.handleChange - Función de callback para manejar el cambio de valor.
 */
export function DeviceMonitoringStatusCombobox({
	value,
	name,
	error = '',
	type,
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string | null
	name: string
	error?: string
	type?: 'location' | 'device'
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const options: { id: string; name: string }[] = useMemo(() => {
		const optionalStatus = {
			id: DeviceMonitoringStatuses.HOSTNAME_MISMATCH,
			name: 'Nombre de host inconsistente'
		}
		const defaultOptions = [
			{ id: 'all', name: 'Todos' },
			{ id: DeviceMonitoringStatuses.ONLINE, name: 'En línea' },
			{ id: DeviceMonitoringStatuses.OFFLINE, name: 'Fuera de línea' }
		]
		if (type === 'device') {
			return [...defaultOptions, optionalStatus]
		} else {
			return defaultOptions
		}
	}, [type])
	return (
		<>
			<Combobox
				id="deviceMonitoringStatus"
				label="Filtrar por estatus"
				value={value ?? 'all'}
				name={name}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={(name, value) => {
					const newValue = value === 'all' ? '' : value
					handleChange(name, newValue)
				}}
				readOnly={readonly}
			/>
		</>
	)
}
