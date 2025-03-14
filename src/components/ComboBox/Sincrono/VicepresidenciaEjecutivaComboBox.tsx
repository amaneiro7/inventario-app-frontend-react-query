import { memo, useMemo } from 'react'
import { useGetAllVicepresidenciaEjecutivas } from '@/core/employee/vicepresidenciaEjecutiva/infra/hook/useGetAllVicepresidenciaEjecutiva'
import { type VicepresidenciaEjecutivaFilters } from '@/core/employee/vicepresidenciaEjecutiva/application/createVicepresidenciaEjecutivaQueryParams'
import { Combobox } from '@/components/Input/Combobox'

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
	const query: VicepresidenciaEjecutivaFilters = useMemo(
		() => ({
			...(value ? { id: value } : {}),
			directivaId
		}),
		[value, directivaId]
	)

	const { vicepresidenciaEjecutivas, isLoading } = useGetAllVicepresidenciaEjecutivas(query)

	const options = useMemo(
		() => vicepresidenciaEjecutivas?.data ?? [],
		[vicepresidenciaEjecutivas]
	)

	return (
		<>
			<Combobox
				id="VicepresidenciaEjecutiva"
				label="Vicepresidencia Ejecutiva"
				value={value}
				name={name}
				loading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				readOnly={readonly}
				onChangeValue={handleChange}
			/>
		</>
	)
})
