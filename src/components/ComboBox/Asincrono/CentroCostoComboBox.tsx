import { lazy, Suspense, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { type CentroCostoFilters } from '@/core/employee/centroCosto/application/createCentroCostoQueryParams'
import { useGetAllCentroCosto } from '@/core/employee/centroCosto/infra/hook/useGetAllCentroCosto'
import { CentroCostoDto } from '@/core/employee/centroCosto/domain/dto/CentroCosto.dto'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))
export function CentroCostoCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: CentroCostoFilters = useMemo(() => {
		return {
			...(debouncedSearch
				? { name: debouncedSearch, id: debouncedSearch }
				: { pageSize: 10 }),
			...(value ? { id: value } : {})
		}
	}, [debouncedSearch, value])

	const { centroCostos, isLoading } = useGetAllCentroCosto(query)

	const options = useMemo(() => centroCostos?.data ?? [], [centroCostos])

	const displayAccessorFunction = (option: { id: string }) => {
		const opt = option as CentroCostoDto
		return `${opt.id} - ${opt.name}`
	}

	const render = useMemo(() => {
		const id = 'centroCosto'
		const label = 'Centro de Costo'

		if (readonly) {
			const initialValue = options.find(ctCosto => ctCosto.id === value)
			return (
				<Suspense>
					<Input
						id={id}
						label={label}
						value={initialValue?.name ?? ''}
						required={required}
						name={name}
						readOnly
						tabIndex={-1}
						aria-readonly
					/>
				</Suspense>
			)
		}
		return (
			<Suspense>
				<Combobox
					id={id}
					label={label}
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
					onInputChange={value => {
						setInputValue(value)
					}}
					onChangeValue={handleChange}
				/>
			</Suspense>
		)
	}, [
		readonly,
		value,
		centroCostos,
		inputValue,
		isLoading,
		required,
		disabled,
		error,
		handleChange,
		name
	])

	return <>{render}</>
}
