import { useMemo, useState } from 'react'
import { useGetAllState } from '@/entities/locations/state/infra/hook/useGetAllState'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import type { StateFilters } from '@/entities/locations/state/application/createStateQueryParams'

export function StateCombobox({
	value = '',
	name,
	regionId,
	error = '',
	administrativeRegionId = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
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
	isLoading?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const query: StateFilters = useMemo(() => {
		return {
			regionId,
			administrativeRegionId
		}
	}, [value, regionId, administrativeRegionId])
	const { data, isLoading: loading } = useGetAllState(query)

	const options = useMemo(
		() => data?.data.sort((a, b) => a.name.localeCompare(b.name)) ?? [],
		[data]
	)

	const filteredOptions = useFilterOptions({ options, inputValue })

	return (
		<>
			<Combobox
				id="stateId"
				label="Estados"
				value={value}
				name={name}
				loading={loading}
				isLoading={isLoading}
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
