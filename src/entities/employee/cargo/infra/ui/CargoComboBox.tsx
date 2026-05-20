import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllCargo } from '@/entities/employee/cargo/infra/hook/useGetAllCargo'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type CargoFilters } from '@/entities/employee/cargo/application/createCargoQueryParams'

interface CargoComboboxProps {
	value?: string
	unidadId?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
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
	unidadId = '',
	handleChange
}: CargoComboboxProps) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: CargoFilters = useMemo(() => {
		return {
			...(value ? { id: value } : {}),
			...(debouncedSearch ? { name: debouncedSearch, id: undefined } : { pageSize: 10 }),
			unidadId
		}
	}, [debouncedSearch, value, unidadId])

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
