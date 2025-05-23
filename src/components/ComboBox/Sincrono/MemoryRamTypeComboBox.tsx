import { memo, useMemo } from 'react'
import { useGetAllMemoryRamType } from '@/core/model/memoryRamType/infra/hook/useMemoryRamType'
import { Combobox } from '@/components/Input/Combobox'

export const MemoryRamTypeCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const { memoryRamTypes, isLoading } = useGetAllMemoryRamType({})

	const options = useMemo(() => memoryRamTypes?.data ?? [], [memoryRamTypes])

	return (
		<>
			<Combobox
				id="MemoryRamType"
				label="Tipo de memoria"
				value={value}
				name={name}
				loading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={handleChange}
			/>
		</>
	)
})
