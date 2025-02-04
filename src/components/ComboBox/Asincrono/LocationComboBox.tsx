import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { LocationFilters } from '@/core/locations/locations/application/LocationGetByCriteria'
import { useGetAllLocations } from '@/hooks/getAll/useGetAllLocation'
import { Combobox } from '@/components/ComboBox/ComboBox'

export function LocationCombobox({
	value = '',
	name,
	typeOfSiteId,
	siteId,
	handleChange
}: {
	value?: string
	name: string
	typeOfSiteId?: string
	siteId?: string
	handleChange: (name: string, value: string) => void
}) {
	const [query, setQuery] = useState<LocationFilters>({
		options: {
			id: value,
			typeOfSiteId,
			siteId
		}
	})
	const { locations, isLoading } = useGetAllLocations(query)
	const initialValue = useMemo(() => {
		return locations?.data.find(location => location.id === value) ?? null
	}, [value, locations])
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)

	useEffectAfterMount(() => {
		setQuery({
			options: {
				name: debouncedSearch
			},
			pageSize: debouncedSearch === '' ? 10 : undefined
		})
	}, [debouncedSearch])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Ubicación"
				value={initialValue}
				options={locations?.data ?? []}
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
