import { lazy, useMemo, useState } from 'react'
import { useGetAllOperatingSystem } from '@/core/devices/features/operatingSystem/operatingSystem/infra/hook/useGetAllOperatingSystem'
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
	const [inputValue, setInputValue] = useState('')
	const { operatingSystems, isLoading } = useGetAllOperatingSystem({})

	const options = useMemo(() => operatingSystems?.data ?? [], [operatingSystems])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Sistemas Operativos"
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
