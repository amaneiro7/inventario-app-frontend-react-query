import { memo, useMemo, useState } from 'react'
import { useGetAllVicepresidenciaEjecutivas } from '@/entities/employee/vicepresidenciaEjecutiva/infra/hook/useGetAllVicepresidenciaEjecutiva'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type VicepresidenciaEjecutivaFilters } from '@/entities/employee/vicepresidenciaEjecutiva/application/createVicepresidenciaEjecutivaQueryParams'

interface VicepresidenciaEjecutivaComboboxProps {
	value?: string
	name: string
	directivaId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	isLoading?: boolean
	readonly?: boolean
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
	isLoading = false,
	handleChange
}: VicepresidenciaEjecutivaComboboxProps) {
	const [inputValue, setInputValue] = useState('')
	const query: VicepresidenciaEjecutivaFilters = useMemo(
		() => ({
			directivaId
		}),
		[directivaId]
	)

	const { data, isLoading: loading } = useGetAllVicepresidenciaEjecutivas(query)

	const options = useMemo(() => data?.data ?? [], [data])

	const filteredOptions = useFilterOptions({ options, inputValue })

	return (
		<>
			<Combobox
				id="VicepresidenciaEjecutiva"
				label="Vicepresidencia Ejecutiva"
				value={value}
				name={name}
				isLoading={isLoading}
				loading={loading}
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
