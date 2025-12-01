import { memo, useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { useGetAllDepartamento } from '@/entities/employee/departamento/infra/hook/useGetAllDepartamento'
import { type DepartamentoFilters } from '@/entities/employee/departamento/application/createDepartamentoQueryParams'

interface DepartamentoComboboxProps {
	value?: string
	vicepresidenciaId?: string
	vicepresidenciaEjecutivaId?: string
	directivaId?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	handleChange: (name: string, value: string | number) => void
}

/**
 * `DepartamentoCombobox` is a memoized functional component that provides a searchable combobox for selecting departamentos.
 * It fetches departamento data based on user input and associated organizational hierarchy IDs (directiva, vicepresidencia ejecutiva, vicepresidencia).
 */
export const DepartamentoCombobox = memo(function ({
	value = '',
	vicepresidenciaId,
	directivaId,
	vicepresidenciaEjecutivaId,
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	handleChange
}: DepartamentoComboboxProps) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)

	const query: DepartamentoFilters = useMemo(() => {
		return {
			...(value ? { id: value } : { id: undefined }),
			...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 }),
			vicepresidenciaId,
			directivaId,
			vicepresidenciaEjecutivaId
		}
	}, [debouncedSearch, value, name, vicepresidenciaId, directivaId, vicepresidenciaEjecutivaId])

	const { data, isLoading: loading } = useGetAllDepartamento(query)
	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="departamentoId"
				label="Departamentos"
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
				onChangeValue={handleChange}
				onInputChange={setInputValue}
				readOnly={readonly}
			/>
		</>
	)
})
