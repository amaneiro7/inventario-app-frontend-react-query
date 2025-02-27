import { useState, useMemo } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllCity } from '@/core/locations/city/infra/hook/useGetAllCity'
import { type CityFilters } from '@/core/locations/city/application/createCityQueryParams'
import { Combobox } from '@/components/Input/Combobox'

export function CityCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
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

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Ciudad"
				value={value}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				options={options}
				inputValue={inputValue}
				onInputChange={value => {
					setInputValue(value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
}
