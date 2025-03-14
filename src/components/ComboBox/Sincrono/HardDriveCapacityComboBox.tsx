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
	const { hardDriveCapacities, isLoading } = useGetAllHardDriveCapacity({})

	const options = useMemo(() => {
		return (
			hardDriveCapacities?.data?.map(({ id, name }) => ({
				id,
				name: `${name} Gb`
			})) ?? []
		)
	}, [hardDriveCapacities])

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
