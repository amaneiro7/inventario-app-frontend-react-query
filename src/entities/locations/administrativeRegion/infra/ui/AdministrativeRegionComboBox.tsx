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
	isLoading = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const { data, isLoading: loading } = useGetAllAdministrativeRegion({})

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="administrativeregionId"
				label="Región Administrativa"
				value={value}
				name={name}
				loading={loading}
				isLoading={isLoading}
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
