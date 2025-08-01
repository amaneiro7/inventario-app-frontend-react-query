import { memo, useMemo } from 'react'
import { useGetAllHardDriveType } from '@/entities/devices/features/hardDrive/hardDriveType/infra/hook/useGetAllHardDriveType'
import { Combobox } from '@/shared/ui/Input/Combobox'

export const HardDriveTypeCombobox = memo(function ({
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
	const { hardDriveTypes, isLoading } = useGetAllHardDriveType({})

	const options = useMemo(() => hardDriveTypes?.data ?? [], [hardDriveTypes])

	return (
		<>
			<Combobox
				id="HardDriveType"
				label="Tipo"
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
