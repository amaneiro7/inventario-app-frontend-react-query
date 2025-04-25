import { memo, useMemo, useState } from 'react'
import { Combobox } from '@/components/Input/Combobox'
import { useFilterOptions } from '@/hooks/useFilterOptions'
import { useGetAllAdministrativeRegion } from '@/core/locations/administrativeRegion/infra/hook/useGetAllAdministrativeRegion'

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
	const [inputValue, setInputValue] = useState('')
	const { administrativeRegions, isLoading } = useGetAllAdministrativeRegion({})

	const options = useMemo(() => administrativeRegions?.data ?? [], [administrativeRegions])

	const filteredOptions = useFilterOptions({ options, inputValue })

	return (
		<>
			<Combobox
				id="AdministrativeregionId"
				label="Zona Administrativa"
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
