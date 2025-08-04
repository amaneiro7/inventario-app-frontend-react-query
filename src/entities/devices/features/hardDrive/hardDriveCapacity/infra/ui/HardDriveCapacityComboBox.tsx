import { memo, useMemo } from 'react'
import { useGetAllHardDriveCapacity } from '@/entities/devices/features/hardDrive/hardDriveCapacity/infra/hook/useGetAllHardDriveCapacity'
import { Combobox } from '@/shared/ui/Input/Combobox'

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
	const { data, isLoading } = useGetAllHardDriveCapacity({})

	const options = useMemo(() => {
		return (
			data?.data?.map(({ id, name }) => ({
				id,
				name: `${name} Gb`
			})) ?? []
		)
	}, [data])

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
