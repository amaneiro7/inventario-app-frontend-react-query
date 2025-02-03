import { useMemo, useState } from 'react'
import { Combobox } from '@/components/ComboBox/ComboBox'
import { useGetAllState } from '@/hooks/getAll/useGetAllState'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { type StateFilters } from '@/core/locations/state/application/StateGetByCriteria'

export function StateCombobox({
	value,
	name,
	regionId,
	handleChange
}: {
	value: string
	regionId: string
	name: string

	handleChange: (name: string, value: string) => void
}) {
	const [query, setQuery] = useState<StateFilters>({
		options: {
			id: value,
			regionId
		}
	})
	const { states, isLoading } = useGetAllState(query)

	useEffectAfterMount(() => {
		setQuery({
			options: {
				regionId
			}
		})
	}, [regionId])

	const initialValue = useMemo(() => {
		return states?.data.find(state => state.id === value) ?? null
	}, [value, states])
	const [inputValue, setInputValue] = useState('')

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Estados"
				value={initialValue}
				options={states?.data ?? []}
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
