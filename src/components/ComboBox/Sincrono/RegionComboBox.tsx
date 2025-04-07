import { memo, useMemo, useState } from 'react'
import { useGetAllRegion } from '@/core/locations/region/infra/hook/useGetAllRegion'
import { Combobox } from '@/components/Input/Combobox'
import { useFilterOptions } from '@/hooks/useFilterOptions'
import { type RegionFilters } from '@/core/locations/region/application/createRegionQueryParams'

export const RegionCombobox = memo(function ({
	value = '',
	name,
	error = '',
	administrativeRegionId = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	administrativeRegionId?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const query: RegionFilters = useMemo(() => {
		return {
			administrativeRegionId
		}
	}, [value, administrativeRegionId])
	const { regions, isLoading } = useGetAllRegion(query)

	const options = useMemo(() => regions?.data ?? [], [regions])

	const filteredOptions = useFilterOptions({ options, inputValue })

	return (
		<>
			<Combobox
				id="regionId"
				label="Región"
				value={value}
				name={name}
				loading={isLoading}
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
