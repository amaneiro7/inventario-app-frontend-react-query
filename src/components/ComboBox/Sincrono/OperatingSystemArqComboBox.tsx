import { lazy, useState } from 'react'
import { useGetAllOperatingSystemArq } from '@/hooks/getAll/useGetAllOperatingSystemArq'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

export function OperatingSystemArqCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string
	handleChange: (name: string, value: string | number) => void
}) {
	const { operatingSystemArqs, isLoading } = useGetAllOperatingSystemArq({
		options: {}
	})
	const [inputValue, setInputValue] = useState('')

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Arqitectura"
				name={name}
				value={value}
				options={operatingSystemArqs?.data ?? []}
				inputValue={inputValue}
				onChangeValue={handleChange}
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
			/>
		</>
	)
}
