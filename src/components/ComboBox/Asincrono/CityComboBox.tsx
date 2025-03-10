import { useState, useMemo, Suspense, lazy } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllCity } from '@/core/locations/city/infra/hook/useGetAllCity'
import { type CityFilters } from '@/core/locations/city/application/createCityQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))

export function CityCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	stateId,
	regionId,
	handleChange
}: {
	value?: string
	name: string
	stateId?: string
	regionId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: CityFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 }),
			...(value ? { id: value } : {}),
			stateId,
			regionId
		}
	}, [debouncedSearch, value, stateId, regionId])

	const { cities, isLoading } = useGetAllCity(query)

	const options = useMemo(() => cities?.data ?? [], [cities])

	const render = useMemo(() => {
		const id = 'city'
		const label = 'Ciudad'

		if (readonly) {
			const initialValue = options.find(city => city.id === value)
			return (
				<Suspense>
					<Input
						id={id}
						label={label}
						value={initialValue?.name ?? ''}
						required
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
					name={name}
					required={required}
					disabled={disabled}
					loading={isLoading}
					error={!!error}
					errorMessage={error}
					options={options}
					inputValue={inputValue}
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
		inputValue,
		cities,
		isLoading,
		required,
		disabled,
		error,
		handleChange,
		name
	])

	return <>{render}</>
}
