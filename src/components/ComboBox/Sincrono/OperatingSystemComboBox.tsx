import { useMemo, useState } from 'react'
import { useGetAllOperatingSystem } from '@/hooks/getAll/useGetAllOperatingSystem'
import { Combobox } from '@/components/ComboBox/ComboBox'

export function OperatingSystemCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string
	handleChange: (name: string, value: string) => void
}) {
	const { operatingSystems, isLoading } = useGetAllOperatingSystem({
		options: {}
	})

	const initialValue = useMemo(() => {
		return operatingSystems?.data.find(OperatingSystem => OperatingSystem.id === value) ?? null
	}, [value, operatingSystems])
	const [inputValue, setInputValue] = useState('')

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Sistemas Operativos"
				value={initialValue}
				options={operatingSystems?.data ?? []}
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
