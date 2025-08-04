import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type SiteErrors,
	type DefaultSite,
	type SiteRequired
} from '@/entities/locations/site/infra/reducers/siteFormReducer'
import { RegionCombobox } from '@/entities/locations/region/infra/ui/RegionComboBox'
import { StateCombobox } from '@/entities/locations/state/infra/ui/StateComboBox'
import { CityCombobox } from '@/entities/locations/city/infra/ui/CityComboBox'
import { FormMode } from '@/shared/lib/hooks/useGetFormMode'

interface Props {
	formData: DefaultSite
	errors: SiteErrors
	required: SiteRequired
	mode: FormMode
	handleChange: (name: Action['type'], value: string | number) => void
}

export const SiteInputs = memo(function ({
	errors,
	mode,
	required,
	formData,
	handleChange
}: Props) {
	return (
		<>
			<RegionCombobox
				value={formData.regionId}
				handleChange={(_name, value) => handleChange('regionId', value)}
				name="regionId"
				required={required.regionId}
				readonly={mode === 'edit'}
			/>
			<StateCombobox
				value={formData.stateId}
				handleChange={(_name, value) => handleChange('stateId', value)}
				name="stateId"
				regionId={formData.regionId}
				required={required.stateId}
				readonly={mode === 'edit'}
			/>
			<CityCombobox
				value={formData.cityId}
				handleChange={(_name, value) => handleChange('cityId', value)}
				name="cityId"
				regionId={formData.regionId}
				stateId={formData.stateId}
				required={required.stateId}
				readonly={mode === 'edit'}
			/>
			<Input
				id="site-address"
				value={formData.address}
				name="address"
				label="Dirección del sitio"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('address', e.target.value)
				}
				error={!!errors?.address}
				errorMessage={errors?.address}
				required={required.address}
			/>
			<Input
				id="site-name"
				value={formData.name}
				name="name"
				label="Nombre de la sitio"
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
