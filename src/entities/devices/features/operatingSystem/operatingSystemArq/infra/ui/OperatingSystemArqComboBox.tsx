import { memo, useMemo } from 'react'
import { useGetAllOperatingSystemArq } from '@/entities/devices/features/operatingSystem/operatingSystemArq/infra/hook/useGetAllOperatingSystemArq'
import { Combobox } from '@/shared/ui/Input/Combobox'

/**
 * `OperatingSystemArqCombobox`
 * @component
 * @description Componente Combobox para seleccionar la arquitectura de un sistema operativo.
 * Muestra las arquitecturas disponibles y permite la selección.
 * @param {object} props - Las propiedades del componente.
 * @param {string} [props.value=''] - El ID de la arquitectura del sistema operativo seleccionada.
 * @param {string} props.name - El nombre del campo del formulario.
 * @param {string} [props.error=''] - Mensaje de error a mostrar.
 * @param {boolean} [props.required=false] - Indica si el campo es requerido.
 * @param {boolean} [props.disabled=false] - Indica si el campo está deshabilitado.
 * @param {(name: string, value: string | number) => void} props.handleChange - Función de callback para manejar el cambio de valor.
 */
export const OperatingSystemArqCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const { data, isLoading } = useGetAllOperatingSystemArq({})

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="operatingSystemArq"
				label="Arquitectura"
				value={value}
				name={name}
				loading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={handleChange}
			/>
		</>
	)
})