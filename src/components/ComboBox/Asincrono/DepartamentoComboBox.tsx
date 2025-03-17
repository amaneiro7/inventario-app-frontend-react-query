import { memo, useCallback, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { Combobox } from '@/components/Input/Combobox'
import { type DepartamentoFilters } from '@/core/employee/departamento/application/createDepartamentoQueryParams'
import { useGetAllDepartamento } from '@/core/employee/departamento/infra/hook/useGetAllDepartamento'
interface BaseProps {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
}
interface SearchProps extends BaseProps {
	method?: 'search'
	handleChange: (name: string, value: string | number) => void
}

interface FormProps extends BaseProps {
	method?: 'form'
	handleFormChange: ({
		value,
		centroCostoId
	}: {
		value: string
		centroCostoId: string
	}) => Promise<void>
}

type Props = SearchProps | FormProps

export const DepartamentoCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	method = 'search',
	...props
}: Props) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)

	const query: DepartamentoFilters = useMemo(() => {
		return {
			...(value ? { id: value } : { id: undefined }),
			...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch, value, name])

	const { departamentos, isLoading } = useGetAllDepartamento(query)
	const options = useMemo(() => departamentos?.data ?? [], [departamentos])

	const getDepartamentosData = useCallback(
		(value: string | number) => {
			return options.find(dep => dep.id === value)
		},
		[options]
	)

	const handleChangeValue = useCallback(
		(name: string, value: string | number) => {
			if (method === 'form' && 'handleFormChange' in props) {
				const data = getDepartamentosData(value)
				console.log('departamento combobox', data)
				props.handleFormChange({
					value: `${value}`,
					centroCostoId: data?.centroCostoId ?? ''
				})
			} else if (method === 'search' && 'handleChange' in props) {
				props.handleChange(name, value)
			}
		},
		[options, method, props]
	)

	return (
		<>
			<Combobox
				id="departamentoId"
				label="departamentos"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={options}
				onChangeValue={handleChangeValue}
				onInputChange={setInputValue}
				readOnly={readonly}
			/>
		</>
	)
})
