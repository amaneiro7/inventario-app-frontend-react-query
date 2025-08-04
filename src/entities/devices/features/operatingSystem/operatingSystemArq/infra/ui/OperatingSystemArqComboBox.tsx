import { memo, useMemo } from 'react'
import { useGetAllOperatingSystemArq } from '@/entities/devices/features/operatingSystem/operatingSystemArq/infra/hook/useGetAllOperatingSystemArq'
import { Combobox } from '@/shared/ui/Input/Combobox'

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
	const { data, isLoading } = useGetAllOperatingSystemArq({})

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="operatingSystemArq"
				label="Arquitectura"
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
