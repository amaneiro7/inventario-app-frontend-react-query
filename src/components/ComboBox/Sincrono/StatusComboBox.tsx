import { useMemo, useState } from 'react'
import { Combobox } from '@/components/ComboBox/ComboBox'
import { useGetAllStatus } from '@/hooks/getAll/useGetAllStatus'

export function StatusCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string

	handleChange: (name: string, value: string) => void
}) {
	const { status, isLoading } = useGetAllStatus({
		options: {
			id: value
		}
	})

	const initialValue = useMemo(() => {
		return status?.data.find(stat => stat.id === value) ?? null
	}, [value, status])
	const [inputValue, setInputValue] = useState('')

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Estatus"
				value={initialValue}
				options={status?.data ?? []}
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
