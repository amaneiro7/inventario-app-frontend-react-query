import { memo, useMemo } from 'react'
import { useGetAllVicepresidencias } from '@/core/employee/vicepresidencia/infra/hook/useGetAllVicepresidencia'
import { type VicepresidenciaFilters } from '@/core/employee/vicepresidencia/application/createVicepresidenciaQueryParams'
import { Combobox } from '@/components/Input/Combobox'

export const VicepresidenciaCombobox = memo(function ({
	value = '',
	name,
	vicepresidenciaEjecutivaId,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	vicepresidenciaEjecutivaId?: string
	name: string
	error?: string
	required?: boolean
	readonly?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const query: VicepresidenciaFilters = useMemo(
		() => ({
			...(value ? { id: value } : {}),
			vicepresidenciaEjecutivaId
		}),
		[value, vicepresidenciaEjecutivaId]
	)

	const { vicepresidencias, isLoading } = useGetAllVicepresidencias(query)

	const options = useMemo(() => vicepresidencias?.data ?? [], [vicepresidencias])

	return (
		<>
			<Combobox
				id="vicepresidencia"
				label="Vicepresidencia "
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
