import { useMemo } from 'react'
import { useGetAllLocationStatus } from '@/entities/locations/locationStatus/infra/hook/useGetAllLocationStatus'
import { Combobox } from '@/shared/ui/Input/Combobox'

export function LocationStatusCombobox({
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
	const { data, isLoading: loading } = useGetAllLocationStatus({})

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="location-status"
				label="Estatus Operacional"
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
}
