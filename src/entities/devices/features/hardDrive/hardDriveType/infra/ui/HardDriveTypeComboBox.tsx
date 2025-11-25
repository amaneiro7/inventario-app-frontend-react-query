import { memo, useMemo } from 'react'
import { useGetAllHardDriveType } from '@/entities/devices/features/hardDrive/hardDriveType/infra/hook/useGetAllHardDriveType'
import { Combobox } from '@/shared/ui/Input/Combobox'

/**
 * `HardDriveTypeCombobox`
 * @component
 * @description Componente Combobox para seleccionar el tipo de disco duro.
 * Muestra los tipos de disco duro disponibles y permite la selección.
 * @param {object} props - Las propiedades del componente.
 * @param {string} [props.value=''] - El ID del tipo de disco duro seleccionado.
 * @param {string} props.name - El nombre del campo del formulario.
 * @param {string} [props.error=''] - Mensaje de error a mostrar.
 * @param {boolean} [props.required=false] - Indica si el campo es requerido.
 * @param {boolean} [props.disabled=false] - Indica si el campo está deshabilitado.
 * @param {(name: string, value: string | number) => void} props.handleChange - Función de callback para manejar el cambio de valor.
 */
export const HardDriveTypeCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	isLoading = false,
	disabled = false,
	readonly,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	isLoading?: boolean
	readonly?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const { data, isLoading: loading } = useGetAllHardDriveType({})

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="HardDriveType"
				label="Tipo"
				value={value}
				name={name}
				loading={loading}
				isLoading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				readOnly={readonly}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={handleChange}
			/>
		</>
	)
})
