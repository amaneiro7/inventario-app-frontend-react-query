import { useCallback, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllCentroCosto } from '@/core/employee/centroCosto/infra/hook/useGetAllCentroCosto'
import { CentroCostoDto } from '@/core/employee/centroCosto/domain/dto/CentroCosto.dto'
import { Combobox } from '@/components/Input/Combobox'
import { type CentroCostoFilters } from '@/core/employee/centroCosto/application/createCentroCostoQueryParams'
export function CentroCostoCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: CentroCostoFilters = useMemo(() => {
		return {
			...(debouncedSearch
				? { name: debouncedSearch, id: debouncedSearch }
				: { pageSize: 10 }),
			...(value ? { id: value } : {})
		}
	}, [debouncedSearch, value])

	const { centroCostos, isLoading } = useGetAllCentroCosto(query)

	const options = useMemo(() => centroCostos?.data ?? [], [centroCostos])

	const displayAccessorFunction = useCallback(
		(option: { id: string }) => {
			const opt = option as CentroCostoDto
			return `${opt.id} - ${opt.name}`
		},
		[options]
	)

	return (
		<>
			<Combobox
				id="centroCosto"
				label="Centro de Costo"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={options}
				displayAccessor={displayAccessorFunction}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
}
