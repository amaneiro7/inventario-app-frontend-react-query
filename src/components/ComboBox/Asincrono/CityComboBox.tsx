import { useEffect, lazy, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { useGetAllCity } from '@/hooks/getAll/useGetAllCity'
import { type CityFilters } from '@/core/locations/city/application/CityGetByCriteria'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

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
	handleChange: (name: string, value: string | number) => void
}) {
	const [query, setQuery] = useState<CityFilters>({
		options: {
			id: value,
			stateId,
			regionId
		},
		pageSize: value || stateId || regionId ? undefined : 10
	})
	const { cities, isLoading } = useGetAllCity(query)
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

	useEffect(() => {
		setQuery({
			options: {
				id: value,
				regionId,
				stateId
			},
			pageSize: value || stateId || regionId ? undefined : 10
		})
	}, [value, regionId, stateId])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Ciudad"
				value={value}
				name={name}
				options={cities?.data ?? []}
				inputValue={inputValue}
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
}
