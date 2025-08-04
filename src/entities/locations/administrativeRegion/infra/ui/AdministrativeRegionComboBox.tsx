import { memo, useMemo } from 'react'
import { useGetAllAdministrativeRegion } from '@/entities/locations/administrativeRegion/infra/hook/useGetAllAdministrativeRegion'
import { Combobox } from '@/shared/ui/Input/Combobox'

export const AdministrativeRegionCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const { data, isLoading } = useGetAllAdministrativeRegion({})

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="administrativeregionId"
				label="Región Administrativa"
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
				readOnly={readonly}
			/>
		</>
	)
})
