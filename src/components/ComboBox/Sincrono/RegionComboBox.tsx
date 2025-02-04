import { useMemo, useState } from 'react'
import { Combobox } from '@/components/ComboBox/ComboBox'
import { useGetAllRegion } from '@/hooks/getAll/useGetAllRegion'

export function RegionCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string

	handleChange: (name: string, value: string) => void
}) {
	const { regions, isLoading } = useGetAllRegion({
		options: {
			id: value
		}
	})

	const initialValue = useMemo(() => {
		return regions?.data.find(region => region.id === value) ?? null
	}, [value, regions])
	const [inputValue, setInputValue] = useState('')

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Región"
				value={initialValue}
				options={regions?.data ?? []}
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
