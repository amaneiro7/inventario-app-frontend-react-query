import { memo, useMemo, useState } from 'react'
import { useGetAllRegion } from '@/entities/locations/region/infra/hook/useGetAllRegion'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { type RegionFilters } from '@/entities/locations/region/application/createRegionQueryParams'

export const RegionCombobox = memo(function ({
	value = '',
	name,
	error = '',
	administrativeRegionId = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	administrativeRegionId?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const query: RegionFilters = useMemo(() => {
		return {
			administrativeRegionId
		}
	}, [value, administrativeRegionId])
	const { data, isLoading: loading } = useGetAllRegion(query)

	const options = useMemo(() => data?.data ?? [], [data])

	const filteredOptions = useFilterOptions({ options, inputValue })

	return (
		<>
			<Combobox
				id="regionId"
				label="Región"
				value={value}
				name={name}
				isLoading={isLoading}
				loading={loading}
				options={filteredOptions}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
})
