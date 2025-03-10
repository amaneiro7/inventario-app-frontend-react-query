import { lazy, Suspense, useMemo, useState } from 'react'
import { useGetAllState } from '@/core/locations/state/infra/hook/useGetAllState'
import { type StateFilters } from '@/core/locations/state/application/createStateQueryParams'
import { useFilterOptions } from '@/hooks/useFilterOptions'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))

export function StateCombobox({
	value = '',
	name,
	regionId,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	regionId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const query: StateFilters = useMemo(() => {
		return {
			regionId
		}
	}, [value, regionId])
	const { states, isLoading } = useGetAllState(query)

	const options = useMemo(() => states?.data ?? [], [states])

	const filteredOptions = useFilterOptions({ options, inputValue })

	const render = useMemo(() => {
		const id = 'stateId'
		const label = 'Estados'

		if (readonly) {
			const initialValue = options.find(state => state.id === value)
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
					loading={isLoading}
					options={filteredOptions}
					required={required}
					disabled={disabled}
					error={!!error}
					errorMessage={error}
					inputValue={inputValue}
					onChangeValue={handleChange}
					onInputChange={value => {
						setInputValue(value)
					}}
				/>
			</Suspense>
		)
	}, [
		readonly,
		value,
		inputValue,
		states,
		isLoading,
		required,
		disabled,
		error,
		handleChange,
		name
	])

	return <>{render}</>
}
