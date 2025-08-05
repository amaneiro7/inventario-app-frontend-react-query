import { memo, useMemo, useState } from 'react'
import { useGetAllVicepresidenciaEjecutivas } from '@/entities/employee/vicepresidenciaEjecutiva/infra/hook/useGetAllVicepresidenciaEjecutiva'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type VicepresidenciaEjecutivaFilters } from '@/entities/employee/vicepresidenciaEjecutiva/application/createVicepresidenciaEjecutivaQueryParams'

interface VicepresidenciaEjecutivaComboboxProps {
	/**
	 * The currently selected executive vicepresidencia ID.
	 */
	value?: string
	/**
	 * The name of the input field.
	 */
	name: string
	/**
	 * The ID of the associated directiva, used for filtering executive vicepresidencias.
	 */
	directivaId?: string
	/**
	 * Error message to display, if any.
	 */
	error?: string
	/**
	 * Whether the input is required.
	 */
	required?: boolean
	/**
	 * Whether the input is disabled.
	 */
	disabled?: boolean
	/**
	 * Whether the input is read-only.
	 */
	readonly?: boolean
	/**
	 * Callback function triggered when the selected value changes.
	 * @param name - The name of the input field.
	 * @param value - The new selected value (executive vicepresidencia ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `VicepresidenciaEjecutivaCombobox` is a memoized functional component that provides a searchable combobox for selecting executive vicepresidencias.
 * It fetches executive vicepresidencia data based on user input and associated directiva ID.
 */
export const VicepresidenciaEjecutivaCombobox = memo(function ({
	value = '',
	name,
	directivaId,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: VicepresidenciaEjecutivaComboboxProps) {
	const [inputValue, setInputValue] = useState('')
	const query: VicepresidenciaEjecutivaFilters = useMemo(
		() => ({
			...(value ? { id: value } : {}),
			directivaId
		}),
		[value, directivaId]
	)

	const { data, isLoading } = useGetAllVicepresidenciaEjecutivas(query)

	const options = useMemo(() => data?.data ?? [], [data])

	const filteredOptions = useFilterOptions({ options, inputValue })

	return (
		<>
			<Combobox
				id="VicepresidenciaEjecutiva"
				label="Vicepresidencia Ejecutiva"
				value={value}
				name={name}
				loading={isLoading}
				options={filteredOptions}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				inputValue={inputValue}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
})