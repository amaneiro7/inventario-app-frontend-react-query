import { useEffect, lazy, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { type LocationFilters } from '@/core/locations/locations/application/LocationGetByCriteria'
import { useGetAllLocations } from '@/hooks/getAll/useGetAllLocation'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

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
	handleChange: (name: string, value: string | number) => void
}) {
	const [query, setQuery] = useState<LocationFilters>({
		options: {
			id: value,
			typeOfSiteId,
			siteId
		}
	})
	const { locations, isLoading } = useGetAllLocations(query)
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

	useEffect(() => {
		setQuery({
			options: {
				id: value,
				typeOfSiteId,
				siteId
			}
		})
	}, [value, typeOfSiteId, siteId])

	return (
		<>
			<Combobox
				id="location"
				value={value}
				label="Ubicación"
				inputValue={inputValue}
				name={name}
				loading={isLoading}
				options={locations?.data ?? []}
				onChangeValue={handleChange}
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
			/>
		</>
	)
}
