import { memo } from 'react'
import { Input } from '@/components/Input/Input'
import {
	type Action,
	type CityErrors,
	type DefaultCity,
	type CityRequired
} from '@/core/locations/city/infra/reducers/cityFormReducer'
import { RegionCombobox } from '@/components/ComboBox/Sincrono/RegionComboBox'
import { StateCombobox } from '@/components/ComboBox/Sincrono/StateComboBox'

interface Props {
	formData: DefaultCity
	errors: CityErrors
	required: CityRequired
	handleChange: (name: Action['type'], value: string | number) => void
}

export const CityInputs = memo(function ({ errors, required, formData, handleChange }: Props) {
	return (
		<>
			<RegionCombobox
				value={formData.regionId}
				handleChange={(_name, value) => handleChange('regionId', value)}
				name="regionId"
				required={required.regionId}
			/>
			<StateCombobox
				value={formData.stateId}
				handleChange={(_name, value) => handleChange('stateId', value)}
				name="stateId"
				regionId={formData.regionId}
				required={required.stateId}
			/>
			<Input
				value={formData.name}
				name="name"
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
})
