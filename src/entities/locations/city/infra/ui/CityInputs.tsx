import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type CityErrors,
	type DefaultCity,
	type CityRequired
} from '@/entities/locations/city/infra/reducers/cityFormReducer'
import { RegionCombobox } from '@/entities/locations/region/infra/ui/RegionComboBox'
import { StateCombobox } from '@/entities/locations/state/infra/ui/StateComboBox'
import { AdministrativeRegionCombobox } from '@/entities/locations/administrativeRegion/infra/ui/AdministrativeRegionComboBox'

interface CityInputsProps {
	formData: DefaultCity
	errors: CityErrors
	isLoading: boolean
	required: CityRequired
	handleChange: (name: Action['type'], value: string | number) => void
}

export const CityInputs = memo(
	({ errors, required, formData, handleChange, isLoading = false }: CityInputsProps) => {
		return (
			<>
				<AdministrativeRegionCombobox
					value={formData.administrativeRegionId}
					handleChange={(_name, value) => handleChange('administrativeRegionId', value)}
					name="administrativeRegionId"
					isLoading={isLoading}
					required={required.administrativeRegionId}
				/>
				<RegionCombobox
					value={formData.regionId}
					handleChange={(_name, value) => handleChange('regionId', value)}
					name="regionId"
					administrativeRegionId={formData.administrativeRegionId}
					isLoading={isLoading}
					required={required.regionId}
				/>
				<StateCombobox
					value={formData.stateId}
					isLoading={isLoading}
					handleChange={(_name, value) => handleChange('stateId', value)}
					name="stateId"
					regionId={formData.regionId}
					required={required.stateId}
				/>
				<Input
					id="city-name"
					value={formData.name}
					name="name"
					isLoading={isLoading}
					label="Nombre de la ciudad"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required={required.name}
				/>
			</>
		)
	}
)

CityInputs.displayName = 'CityInputs'
