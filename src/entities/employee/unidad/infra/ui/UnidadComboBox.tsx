import { memo, useMemo, useState } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { useGetAllUnidad } from '../hook/useGetAllUnidad'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import type { UnidadFilters } from '../../application/createUnidadQueryParams'
import type { UnidadDto } from '../../domain/dto/Unidad.dto'

interface BaseProps {
	value?: string
	name: string
	error?: string
	label?: string
	required?: boolean
	disabled?: boolean
	isLoading?: boolean
	readonly?: boolean
}

interface SearchProps extends BaseProps {
	method: 'search'
	handleChange: (name: string, value: string | number) => void
}

interface FormProps extends BaseProps {
	method: 'form'
	handleFormChange: ({
		value,
		full_chain
	}: {
		value: UnidadDto['id']
		full_chain?: UnidadDto['full_chain']
	}) => Promise<void>
}

type Props = SearchProps | FormProps

/**
 * `UnidadCombobox` is a memoized functional component that provides a searchable combobox for selecting Unidads.
 * It fetches Unidad data and displays it in a dropdown.
 */
export const UnidadCombobox = memo(
	({
		value = '',
		name,
		error = '',
		method = 'search',
		label = 'Unidad Organizativa',
		required = false,
		disabled = false,
		readonly = false,
		isLoading = false,
		...props
	}: Props) => {
		const [inputValue, setInputValue] = useState('')
		const [debouncedSearch] = useDebounce(inputValue)

		const query: UnidadFilters = useMemo(() => {
			return {
				...(value ? { id: value } : { id: undefined }),
				...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 })
			}
		}, [debouncedSearch, value, name])
		const { data, isLoading: loading } = useGetAllUnidad(query)

		const options = useMemo(() => data?.data ?? [], [data])

		const handleInternalChange = (name: string, value: string | number) => {
			if (method === 'form' && 'handleFormChange' in props) {
				const data = options.find(unidad => unidad.id === value)
				console.log('Selected Unidad:', data)
				props.handleFormChange({ value: `${value}`, full_chain: data?.full_chain })
			} else if (method === 'search' && 'handleChange' in props) {
				props.handleChange(name, value)
			}
		}

		return (
			<>
				<Combobox
					id="unidadId"
					label={label}
					value={value}
					inputValue={inputValue}
					name={name}
					required={required}
					disabled={disabled}
					error={!!error}
					errorMessage={error}
					loading={loading}
					isLoading={isLoading}
					options={options}
					onChangeValue={handleInternalChange}
					onInputChange={setInputValue}
					readOnly={readonly}
				/>
			</>
		)
	}
)
