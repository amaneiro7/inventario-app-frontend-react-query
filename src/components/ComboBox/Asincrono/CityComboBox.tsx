import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Combobox } from '@/components/ComboBox/Combobox'
import { useGetAllCity } from '@/hooks/getAll/useGetAllCity'
import { type CityFilters } from '@/core/locations/city/application/CityGetByCriteria'

export function CityCombobox({
	value = '',
	name,
	stateId,
	regionId,
	handleChange
}: {
	value?: string
	name: string
	stateId?: string
	regionId?: string
	handleChange: (name: string, value: string) => void
}) {
	const [query, setQuery] = useState<CityFilters>({
		options: {
			id: value,
			stateId,
			regionId
		}
	})
	const { cities, isLoading } = useGetAllCity(query)
	const initialValue = useMemo(() => {
		return cities?.data.find(city => city.id === value) ?? null
	}, [value, cities])
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)

	useEffectAfterMount(() => {
		setQuery({
			options: {
				name: debouncedSearch,
				stateId,
				regionId
			},
			pageSize: debouncedSearch === '' ? 10 : undefined
		})
	}, [debouncedSearch, stateId, regionId])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Ciudad"
				value={initialValue}
				options={cities?.data ?? []}
				inputValue={inputValue}
				onChange={(_, newValue) => {
					handleChange(name, newValue?.id ?? '')
				}}
				onInputChange={(_, newInputValue, reason) => {
					if (reason === 'reset') return
					setInputValue(newInputValue)
				}}
			/>
		</>
	)
}
