import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { AdministrativeRegionCombobox } from '@/entities/locations/administrativeRegion/infra/ui/AdministrativeRegionComboBox'
import {
	type Action,
	type RegionErrors,
	type DefaultRegion,
	type RegionRequired,
	type RegionDisabled
} from '@/entities/locations/region/infra/reducers/regionFormReducer'

interface RegionInputsProps {
	formData: DefaultRegion
	errors: RegionErrors
	required: RegionRequired
	disabled: RegionDisabled
	isLoading: boolean
	handleChange: (name: Action['type'], value: string | number) => void
}

export const RegionInputs = memo(
	({ errors, required, disabled, formData, isLoading, handleChange }: RegionInputsProps) => {
		return (
			<>
				<AdministrativeRegionCombobox
					value={formData.administrativeRegionId}
					handleChange={(_name, value) => handleChange('administrativeRegionId', value)}
					name="administrativeRegionId"
					isLoading={isLoading}
					required={required.administrativeRegionId}
					disabled={disabled.administrativeRegionId}
				/>
				<Input
					id="region-name"
					value={formData.name}
					name="name"
					isLoading={isLoading}
					label="Nombre de la region"
					error={!!errors?.name}
					errorMessage={errors?.name}
					required={required.name}
					disabled={disabled.name}
				/>
			</>
		)
	}
)

RegionInputs.displayName = 'RegionInputs'
