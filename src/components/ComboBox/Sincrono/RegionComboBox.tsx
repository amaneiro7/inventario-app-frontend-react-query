import { lazy, useEffect, useState } from 'react'
import { useGetAllRegion } from '@/hooks/getAll/useGetAllRegion'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { type RegionFilters } from '@/core/locations/region/application/RegionGetByCriteria'
const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

export function RegionCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string

	handleChange: (name: string, value: string | number) => void
}) {
	const [query, setQuery] = useState<RegionFilters>({
		options: {
			id: value
		}
	})
	const { regions, isLoading } = useGetAllRegion(query)
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

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
				id: value
			}
		})
	}, [value])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Región"
				value={value}
				name={name}
				options={regions?.data ?? []}
				inputValue={inputValue}
				onInputChange={value => {
					setInputValue(value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
}
