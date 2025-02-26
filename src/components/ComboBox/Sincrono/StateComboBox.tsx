import { lazy, useMemo, useState } from 'react'
import { useGetAllState } from '@/core/locations/state/infra/hook/useGetAllState'
import { type StateFilters } from '@/core/locations/state/application/createStateQueryParams'

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
	const [inputValue, setInputValue] = useState('')
	const query: StateFilters = useMemo(() => {
		return {
			regionId
		}
	}, [value, regionId])
	const { states, isLoading } = useGetAllState(query)

	const options = useMemo(() => states?.data ?? [], [states])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Estados"
				value={value}
				name={name}
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
