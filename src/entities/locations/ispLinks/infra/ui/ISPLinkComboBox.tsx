import { useState, useMemo } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { useGetAllISPLink } from '../hook/useGetAllISPLink'
import type { ISPLinkFilters } from '../../application/createISPLinkQueryParams'

export function ISPLinkCombobox({
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

	const query: ISPLinkFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 }),
			...(value ? { id: value } : {})
		}
	}, [debouncedSearch, value])

	const { data, isLoading: loading } = useGetAllISPLink(query)

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="isp-link"
				label="Proveedor de Servicios ISP"
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
}
