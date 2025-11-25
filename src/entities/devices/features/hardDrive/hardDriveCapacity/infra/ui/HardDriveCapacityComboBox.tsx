import { memo, useMemo } from 'react'
import { useGetAllHardDriveCapacity } from '@/entities/devices/features/hardDrive/hardDriveCapacity/infra/hook/useGetAllHardDriveCapacity'
import { Combobox } from '@/shared/ui/Input/Combobox'

/**
 * `HardDriveCapacityCombobox`
 * @component
 * @description Componente Combobox para seleccionar la capacidad de un disco duro.
 * Muestra las capacidades disponibles y permite la selección.
 * @param {object} props - Las propiedades del componente.
 * @param {string} [props.value=''] - El ID de la capacidad de disco duro seleccionada.
 * @param {string} props.name - El nombre del campo del formulario.
 * @param {string} [props.error=''] - Mensaje de error a mostrar.
 * @param {boolean} [props.required=false] - Indica si el campo es requerido.
 * @param {boolean} [props.disabled=false] - Indica si el campo está deshabilitado.
 * @param {(name: string, value: string | number) => void} props.handleChange - Función de callback para manejar el cambio de valor.
 */
export const HardDriveCapacityCombobox = memo(function ({
	value = '',
	name,
	error = '',
	readonly,
	required = false,
	disabled = false,
	isLoading = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	isLoading?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const { data, isLoading: loading } = useGetAllHardDriveCapacity({})

	const options = useMemo(() => {
		return (
			data?.data?.map(({ id, name }) => ({
				id,
				name: `${name} Gb`
			})) ?? []
		)
	}, [data])

	return (
		<>
			<Combobox
				id="HardDriveCapacity"
				label="Disco Duro"
				value={value}
				name={name}
				loading={loading}
				readOnly={readonly}
				isLoading={isLoading}
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
