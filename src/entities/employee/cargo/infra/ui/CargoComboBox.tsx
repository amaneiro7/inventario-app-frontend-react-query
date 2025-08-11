import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllCargo } from '@/entities/employee/cargo/infra/hook/useGetAllCargo'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type CargoFilters } from '@/entities/employee/cargo/application/createCargoQueryParams'

interface CargoComboboxProps {
	/**
	 * The currently selected cargo ID.
	 */
	value?: string
	/**
	 * The ID of the associated department, used for filtering cargos.
	 */
	departamentoId?: string
	/**
	 * The ID of the associated directiva, used for filtering cargos.
	 */
	directivaId?: string
	/**
	 * The ID of the associated executive vicepresidencia, used for filtering cargos.
	 */
	vicepresidenciaEjecutivaId?: string
	/**
	 * The ID of the associated vicepresidencia, used for filtering cargos.
	 */
	vicepresidenciaId?: string
	/**
	 * The name of the input field.
	 */
	name: string
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
	isLoading?: boolean
	/**
	 * Callback function triggered when the selected value changes.
	 * @param name - The name of the input field.
	 * @param value - The new selected value (cargo ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `CargoCombobox` is a functional component that provides a searchable combobox for selecting cargos.
 * It fetches cargo data based on user input and associated organizational hierarchy IDs (directiva, vicepresidencia, departamento).
 */
export function CargoCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	directivaId = '',
	vicepresidenciaEjecutivaId = '',
	vicepresidenciaId = '',
	departamentoId = '',
	handleChange
}: CargoComboboxProps) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: CargoFilters = useMemo(() => {
		return {
			...(value ? { id: value } : {}),
			...(debouncedSearch ? { name: debouncedSearch, id: undefined } : { pageSize: 10 }),
			directivaId,
			vicepresidenciaEjecutivaId,
			vicepresidenciaId,
			departamentoId
		}
	}, [
		debouncedSearch,
		value,
		departamentoId,
		directivaId,
		vicepresidenciaEjecutivaId,
		vicepresidenciaId
	])

	const { data, isLoading: loading } = useGetAllCargo(query)

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="cargo"
				label="Cargos"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={loading}
				isLoading={isLoading}
				options={options}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
}
