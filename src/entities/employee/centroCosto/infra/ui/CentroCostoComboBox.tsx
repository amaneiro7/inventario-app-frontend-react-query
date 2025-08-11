import { useCallback, useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllCentroCosto } from '@/entities/employee/centroCosto/infra/hook/useGetAllCentroCosto'
import { CentroCostoDto } from '@/entities/employee/centroCosto/domain/dto/CentroCosto.dto'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type CentroCostoFilters } from '@/entities/employee/centroCosto/application/createCentroCostoQueryParams'
export function CentroCostoCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
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

	const { data, isLoading: loading } = useGetAllCentroCosto(query)

	const options = useMemo(() => data?.data ?? [], [data])

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
				isLoading={isLoading}
				loading={loading}
				options={options}
				displayAccessor={displayAccessorFunction}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
}
