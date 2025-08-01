import { memo, useMemo } from 'react'
import { useGetAllOperatingSystem } from '@/entities/devices/features/operatingSystem/operatingSystem/infra/hook/useGetAllOperatingSystem'
import { Combobox } from '@/shared/ui/Input/Combobox'

export const OperatingSystemCombobox = memo(function ({
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
	const { operatingSystems, isLoading } = useGetAllOperatingSystem({})

	const options = useMemo(() => operatingSystems?.data ?? [], [operatingSystems])

	return (
		<>
			<Combobox
				id="operatingSystem"
				label="Sistema Operativo"
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
