import { memo, useMemo, useState } from 'react'
import { useGetAllOperatingSystem } from '@/entities/devices/features/operatingSystem/operatingSystem/infra/hook/useGetAllOperatingSystem'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'

/**
 * `OperatingSystemCombobox`
 * @component
 * @description Componente Combobox para seleccionar un sistema operativo.
 * Muestra los sistemas operativos disponibles y permite la selección.
 * @param {object} props - Las propiedades del componente.
 * @param {string} [props.value=''] - El ID del sistema operativo seleccionado.
 * @param {string} props.name - El nombre del campo del formulario.
 * @param {string} [props.error=''] - Mensaje de error a mostrar.
 * @param {boolean} [props.required=false] - Indica si el campo es requerido.
 * @param {boolean} [props.disabled=false] - Indica si el campo está deshabilitado.
 * @param {(name: string, value: string | number) => void} props.handleChange - Función de callback para manejar el cambio de valor.
 */
export const OperatingSystemCombobox = memo(function ({
	value = '',
	name,
	error = '',
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
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const { data, isLoading: loading } = useGetAllOperatingSystem({})

	const options = useMemo(() => data?.data ?? [], [data])

	const filteredOptions = useFilterOptions({ options, inputValue })

	return (
		<>
			<Combobox
				id="operatingSystem"
				label="Sistema Operativo"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				isLoading={isLoading}
				loading={loading}
				options={filteredOptions}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
			/>
		</>
	)
})
