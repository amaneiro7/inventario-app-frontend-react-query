import { lazy, useState } from 'react'
import { useGetAllOperatingSystem } from '@/hooks/getAll/useGetAllOperatingSystem'
const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

export function OperatingSystemCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string
	handleChange: (name: string, value: string | number) => void
}) {
	const { operatingSystems, isLoading } = useGetAllOperatingSystem({
		options: {}
	})

	const [inputValue, setInputValue] = useState('')

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Sistemas Operativos"
				value={value}
				name={name}
				options={operatingSystems?.data ?? []}
				inputValue={inputValue}
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
}
