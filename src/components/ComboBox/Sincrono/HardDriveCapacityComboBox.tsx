import { memo, useMemo } from 'react'
import { useGetAllHardDriveCapacity } from '@/core/devices/features/hardDrive/hardDriveCapacity/infra/hook/useGetAllHardDriveCapacity'
import { Combobox } from '@/components/Input/Combobox'

export const HardDriveCapacityCombobox = memo(function ({
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
	const { HardDriveCapacities, isLoading } = useGetAllHardDriveCapacity({})

	const options = useMemo(() => HardDriveCapacities?.data ?? [], [HardDriveCapacities])

	return (
		<>
			<Combobox
				id="HardDriveCapacity"
				label="Disco Duro"
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
