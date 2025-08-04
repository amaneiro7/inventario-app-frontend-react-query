import { useCallback, useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllCentroTrabajo } from '@/entities/employee/centroTrabajo/infra/hook/useGetAllCentroTrabajo'
import { CentroTrabajoDto } from '@/entities/employee/centroTrabajo/domain/dto/CentroTrabajo.dto'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type CentroTrabajoFilters } from '@/entities/employee/centroTrabajo/application/createCentroTrabajoQueryParams'
export function CentroTrabajoCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	centroCostoId = '',
	handleChange
}: {
	value?: string
	centroCostoId?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: CentroTrabajoFilters = useMemo(() => {
		return {
			...(debouncedSearch
				? { name: debouncedSearch, id: debouncedSearch }
				: { pageSize: 10 }),
			...(value ? { id: value } : {}),
			centroCostoId
		}
	}, [debouncedSearch, value, centroCostoId])

	const { data, isLoading } = useGetAllCentroTrabajo(query)

	const options = useMemo(() => data?.data ?? [], [data])

	const displayAccessorFunction = useCallback(
		(option: { id: string }) => {
			const opt = option as CentroTrabajoDto
			return `${opt.id} - ${opt.name}`
		},
		[options]
	)

	return (
		<>
			<Combobox
				id="centroTrabajo"
				label="Centro de Trabajo"
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
