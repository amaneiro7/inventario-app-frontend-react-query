import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllCargo } from '@/core/employee/cargo/infra/hook/useGetAllCargo'
import { Combobox } from '@/components/Input/Combobox'
import { type CargoFilters } from '@/core/employee/cargo/application/createCargoQueryParams'
export function CargoCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	departamentoId = '',
	handleChange
}: {
	value?: string
	departamentoId?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: CargoFilters = useMemo(() => {
		return {
			...(value ? { id: value } : {}),
			...(debouncedSearch ? { name: debouncedSearch, id: undefined } : { pageSize: 10 }),
			departamentoId
		}
	}, [debouncedSearch, value, departamentoId])

	const { cargos, isLoading } = useGetAllCargo(query)

	const options = useMemo(() => cargos?.data ?? [], [cargos])

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
				loading={isLoading}
				options={options}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
}
