import { useEffect, lazy, useState, memo } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { useGetAllLocations } from '@/hooks/getAll/useGetAllLocation'
import { type LocationFilters } from '@/core/locations/locations/application/LocationGetByCriteria'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

export const LocationCombobox = memo(function ({
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
		},
		pageSize: value || typeOfSiteId || siteId ? undefined : 10
	})
	const { locations, isLoading } = useGetAllLocations(query)
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)

	useEffectAfterMount(() => {
		setQuery({
			options: {
				name: debouncedSearch,
				typeOfSiteId,
				siteId
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
			},
			pageSize: value || typeOfSiteId || siteId ? undefined : 10
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
})
