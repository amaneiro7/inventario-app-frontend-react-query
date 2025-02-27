import { useMemo } from 'react'
import { useGetAllRegion } from '@/core/locations/region/infra/hook/useGetAllRegion'
import { Combobox } from '@/components/Input/Combobox'

export function RegionCombobox({
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
	const { regions, isLoading } = useGetAllRegion({})

	const options = useMemo(() => regions?.data ?? [], [regions])

	return (
		<>
			<Combobox
				id="region"
				label="Región"
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
}
