import { memo, useMemo, useState } from 'react'
import { useGetAllVicepresidenciaEjecutivas } from '@/entities/employee/vicepresidenciaEjecutiva/infra/hook/useGetAllVicepresidenciaEjecutiva'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type VicepresidenciaEjecutivaFilters } from '@/entities/employee/vicepresidenciaEjecutiva/application/createVicepresidenciaEjecutivaQueryParams'

export const VicepresidenciaEjecutivaCombobox = memo(function ({
	value = '',
	name,
	directivaId,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	directivaId?: string
	name: string
	error?: string
	required?: boolean
	readonly?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
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
