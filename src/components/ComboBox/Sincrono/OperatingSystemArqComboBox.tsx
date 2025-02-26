import { lazy, useMemo, useState } from 'react'
import { useGetAllOperatingSystemArq } from '@/core/devices/features/operatingSystem/operatingSystemArq/infra/hook/useGetAllOperatingSystemArq'

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
	const [inputValue, setInputValue] = useState('')
	const { operatingSystemArqs, isLoading } = useGetAllOperatingSystemArq({})

	const options = useMemo(() => operatingSystemArqs?.data ?? [], [operatingSystemArqs])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Arqitectura"
				name={name}
				value={value}
				options={options}
				inputValue={inputValue}
				onChangeValue={handleChange}
				onInputChange={value => {
					setInputValue(value)
				}}
			/>
		</>
	)
}
