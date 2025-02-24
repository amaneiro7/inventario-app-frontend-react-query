import { lazy, useEffect, useState } from 'react'
import { useGetAllState } from '@/hooks/getAll/useGetAllState'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { type StateFilters } from '@/core/locations/state/application/StateGetByCriteria'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

export function StateCombobox({
	value = '',
	name,
	regionId,
	handleChange
}: {
	value?: string
	regionId?: string
	name: string

	handleChange: (name: string, value: string | number) => void
}) {
	const [query, setQuery] = useState<StateFilters>({
		options: {
			id: value,
			regionId
		}
	})
	const { states, isLoading } = useGetAllState(query)
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
				id: value,
				regionId
			}
		})
	}, [value, regionId])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Estados"
				value={value}
				name={name}
				options={states?.data ?? []}
				inputValue={inputValue}
				onInputChange={value => {
					setInputValue(value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
}
