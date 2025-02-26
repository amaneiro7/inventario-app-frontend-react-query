import { lazy, useMemo, useState } from 'react'
import { useGetAllRegion } from '@/core/locations/region/infra/hook/useGetAllRegion'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

export function RegionCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string

	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const { regions, isLoading } = useGetAllRegion({})

	const options = useMemo(() => regions?.data ?? [], [regions])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Región"
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
