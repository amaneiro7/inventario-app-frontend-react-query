import { useMemo, useState } from 'react'
import { useGetAllState } from '@/core/locations/state/infra/hook/useGetAllState'
import { Combobox } from '@/components/Input/Combobox'
import { type StateFilters } from '@/core/locations/state/application/createStateQueryParams'

export function StateCombobox({
	value = '',
	name,
	regionId,
	error = '',
	required = false,
	disabled = false,
	handleChange
}: {
	value?: string
	name: string
	regionId?: string
	error?: string
	required?: boolean
	disabled?: boolean
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

	return (
		<>
			<Combobox
				id="state"
				label="Estados"
				value={value}
				name={name}
				loading={isLoading}
				options={options}
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
		</>
	)
}
