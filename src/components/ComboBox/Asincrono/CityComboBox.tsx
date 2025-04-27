import { useState, useMemo } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllCity } from '@/core/locations/city/infra/hook/useGetAllCity'
import { Combobox } from '@/components/Input/Combobox'
import { type CityFilters } from '@/core/locations/city/application/createCityQueryParams'

export function CityCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	stateId,
	regionId,
	administrativeRegionId = '',
	handleChange
}: {
	value?: string
	name: string
	stateId?: string
	regionId?: string
	administrativeRegionId?: string
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
			regionId,
			administrativeRegionId
		}
	}, [debouncedSearch, value, stateId, regionId, administrativeRegionId])

	const { cities, isLoading } = useGetAllCity(query)

	const options = useMemo(() => cities?.data ?? [], [cities])

	return (
		<>
			<Combobox
				id="city"
				label="Ciudad"
				value={value}
				name={name}
				required={required}
				disabled={disabled}
				loading={isLoading}
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
