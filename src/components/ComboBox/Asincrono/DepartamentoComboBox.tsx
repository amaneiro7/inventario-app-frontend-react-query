import { memo, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { Combobox } from '@/components/Input/Combobox'
import { useGetAllDepartamento } from '@/core/employee/departamento/infra/hook/useGetAllDepartamento'
import { type DepartamentoFilters } from '@/core/employee/departamento/application/createDepartamentoQueryParams'
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
	handleChange: (name: string, value: string | number) => void
}

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

	const { departamentos, isLoading } = useGetAllDepartamento(query)
	const options = useMemo(() => departamentos?.data ?? [], [departamentos])

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
				loading={isLoading}
				options={options}
				onChangeValue={handleChange}
				onInputChange={setInputValue}
				readOnly={readonly}
			/>
		</>
	)
})
