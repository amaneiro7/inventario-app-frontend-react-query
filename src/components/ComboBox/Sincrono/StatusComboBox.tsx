import { lazy, useState } from 'react'
import { useGetAllStatus } from '@/hooks/getAll/useGetAllStatus'
const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

export function StatusCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string

	handleChange: (name: string, value: string | number) => void
}) {
	const { status, isLoading } = useGetAllStatus({
		options: {
			id: value
		}
	})

	const [inputValue, setInputValue] = useState('')

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Estatus"
				name={name}
				value={value}
				options={status?.data ?? []}
				inputValue={inputValue}
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
}
