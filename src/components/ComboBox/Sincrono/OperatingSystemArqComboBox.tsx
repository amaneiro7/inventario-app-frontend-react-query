import { useMemo, useState } from 'react'
import { useGetAllOperatingSystemArq } from '@/hooks/getAll/useGetAllOperatingSystemArq'
import { Combobox } from '@/components/ComboBox/Combobox'

export function OperatingSystemArqCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string
	handleChange: (name: string, value: string) => void
}) {
	const { operatingSystemArqs, isLoading } = useGetAllOperatingSystemArq({
		options: {}
	})

	const initialValue = useMemo(() => {
		return (
			operatingSystemArqs?.data.find(OperatingSystemArq => OperatingSystemArq.id === value) ??
			null
		)
	}, [value, operatingSystemArqs])
	const [inputValue, setInputValue] = useState('')

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Arqitectura"
				value={initialValue}
				options={operatingSystemArqs?.data ?? []}
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
