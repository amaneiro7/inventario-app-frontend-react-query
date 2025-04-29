import { memo } from 'react'
import { Input } from '@/components/Input/Input'
import {
	type Action,
	type RegionErrors,
	type DefaultRegion,
	type RegionRequired,
	type RegionDisabled
} from '@/core/locations/region/infra/reducers/regionFormReducer'
import { AdministrativeRegionCombobox } from '@/components/ComboBox/Sincrono/AdministrativeRegionComboBox'

interface Props {
	formData: DefaultRegion
	errors: RegionErrors
	required: RegionRequired
	disabled: RegionDisabled
	handleChange: (name: Action['type'], value: string | number) => void
}

export const RegionInputs = memo(function ({
	errors,
	required,
	disabled,
	formData,
	handleChange
}: Props) {
	return (
		<>
			<AdministrativeRegionCombobox
				value={formData.administrativeRegionId}
				handleChange={(_name, value) => handleChange('administrativeRegionId', value)}
				name="administrativeRegionId"
				required={required.administrativeRegionId}
				disabled={disabled.administrativeRegionId}
			/>
			<Input
				id="region-name"
				value={formData.name}
				name="name"
				label="Nombre de la region"
				error={!!errors?.name}
				errorMessage={errors?.name}
				required={required.name}
				disabled={disabled.name}
			/>
		</>
	)
})
