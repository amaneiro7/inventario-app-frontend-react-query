import { memo, useMemo } from 'react'
import { useGetAllOperatingSystemArq } from '@/core/devices/features/operatingSystem/operatingSystemArq/infra/hook/useGetAllOperatingSystemArq'
import { Combobox } from '@/components/Input/Combobox'

export const OperatingSystemArqCombobox = memo(function ({
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
	const { operatingSystemArqs, isLoading } = useGetAllOperatingSystemArq({})

	const options = useMemo(() => operatingSystemArqs?.data ?? [], [operatingSystemArqs])

	return (
		<>
			<Combobox
				id="operatingSystemArq"
				label="Arqitectura"
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
