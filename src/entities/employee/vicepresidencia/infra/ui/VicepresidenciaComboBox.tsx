import { memo, useMemo, useState } from 'react'
import { useGetAllVicepresidencias } from '@/entities/employee/vicepresidencia/infra/hook/useGetAllVicepresidencia'
import { type VicepresidenciaFilters } from '@/entities/employee/vicepresidencia/application/createVicepresidenciaQueryParams'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'

interface VicepresidenciaComboboxProps {
	/**
	 * The currently selected vicepresidencia ID.
	 */
	value?: string
	/**
	 * The ID of the associated directiva, used for filtering vicepresidencias.
	 */
	directivaId?: string
	/**
	 * The ID of the associated executive vicepresidencia, used for filtering vicepresidencias.
	 */
	vicepresidenciaEjecutivaId?: string
	/**
	 * The name of the input field.
	 */
	name: string
	/**
	 * Error message to display, if any.
	 */
	error?: string
	/**
	 * Whether the input is required.
	 */
	required?: boolean
	/**
	 * Whether the input is disabled.
	 */
	disabled?: boolean
	/**
	 * Whether the input is read-only.
	 */
	isLoading?: boolean
	/**
	 * Whether the input is loading.
	 */
	readonly?: boolean
	/**
	 * Callback function triggered when the selected value changes.
	 * @param name - The name of the input field.
	 * @param value - The new selected value (vicepresidencia ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `VicepresidenciaCombobox` is a memoized functional component that provides a searchable combobox for selecting vicepresidencias.
 * It fetches vicepresidencia data based on user input and associated organizational hierarchy IDs (directiva, vicepresidencia ejecutiva).
 */
export const VicepresidenciaCombobox = memo(function ({
	value = '',
	name,
	vicepresidenciaEjecutivaId,
	directivaId,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	handleChange
}: VicepresidenciaComboboxProps) {
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

	const { data, isLoading: loading } = useGetAllVicepresidencias(query)

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="vicepresidencia"
				label="Vicepresidencia "
				value={value}
				name={name}
				required={required}
				disabled={disabled}
				loading={loading}
				isLoading={isLoading}
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
