import { Combobox } from '@/shared/ui/Input/Combobox'
/**
 * `EvaluationHardwareStatusCombobox`
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

const options: { id: string; name: string }[] = [
	{ id: 'all', name: 'Todos' },
	{ id: 'true', name: 'Apto' },
	{ id: 'false', name: 'No Apto' }
]
export function EvaluationHardwareStatusCombobox({
	value,
	name,
	label,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string | null
	name: string
	label: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	return (
		<>
			<Combobox
				id={`evaluation-hardware-status-${name}`}
				label={label}
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
