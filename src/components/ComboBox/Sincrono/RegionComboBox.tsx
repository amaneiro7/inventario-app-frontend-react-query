import { memo, useMemo } from 'react'
import { useGetAllRegion } from '@/core/locations/region/infra/hook/useGetAllRegion'
import { Combobox } from '@/components/Input/Combobox'

export const RegionCombobox = memo(function ({
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
	const { regions, isLoading } = useGetAllRegion({})

	const options = useMemo(() => regions?.data ?? [], [regions])

	return (
		<>
			<Combobox
				id="regionId"
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
				readOnly={readonly}
			/>
		</>
	)
})
