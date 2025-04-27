import { useMemo, useState } from 'react'
import { useGetAllState } from '@/core/locations/state/infra/hook/useGetAllState'
import { useFilterOptions } from '@/hooks/useFilterOptions'
import { type StateFilters } from '@/core/locations/state/application/createStateQueryParams'
import { Combobox } from '@/components/Input/Combobox'

export function StateCombobox({
	value = '',
	name,
	regionId,
	error = '',
	administrativeRegionId = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	regionId?: string
	administrativeRegionId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const query: StateFilters = useMemo(() => {
		return {
			regionId,
			administrativeRegionId
		}
	}, [value, regionId, administrativeRegionId])
	const { states, isLoading } = useGetAllState(query)

	const options = useMemo(() => states?.data ?? [], [states])

	const filteredOptions = useFilterOptions({ options, inputValue })

	return (
		<>
			<Combobox
				id="stateId"
				label="Estados"
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
				onInputChange={setInputValue}
				readOnly={readonly}
			/>
		</>
	)
}
