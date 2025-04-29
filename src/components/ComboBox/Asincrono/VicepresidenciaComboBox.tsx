import { memo, useMemo, useState } from 'react'
import { useGetAllVicepresidencias } from '@/core/employee/vicepresidencia/infra/hook/useGetAllVicepresidencia'
import { type VicepresidenciaFilters } from '@/core/employee/vicepresidencia/application/createVicepresidenciaQueryParams'
import { Combobox } from '@/components/Input/Combobox'
import { useDebounce } from '@/hooks/utils/useDebounce'

export const VicepresidenciaCombobox = memo(function ({
	value = '',
	name,
	vicepresidenciaEjecutivaId,
	directivaId,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	directivaId?: string
	vicepresidenciaEjecutivaId?: string
	name: string
	error?: string
	required?: boolean
	readonly?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)
	const query: VicepresidenciaFilters = useMemo(
		() => ({
			...(value ? { id: value } : {}),
			...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 }),
			vicepresidenciaEjecutivaId,
			directivaId
		}),
		[debouncedSearch, value, vicepresidenciaEjecutivaId, directivaId]
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
				required={required}
				disabled={disabled}
				loading={isLoading}
				error={!!error}
				errorMessage={error}
				options={options}
				inputValue={inputValue}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
})
