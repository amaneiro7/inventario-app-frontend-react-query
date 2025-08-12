import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { FormMode } from '@/shared/lib/hooks/useGetFormMode'
import {
	type Action,
	type SiteErrors,
	type DefaultSite,
	type SiteRequired
} from '@/entities/locations/site/infra/reducers/siteFormReducer'

const RegionCombobox = lazy(() =>
	import('@/entities/locations/region/infra/ui/RegionComboBox').then(m => ({
		default: m.RegionCombobox
	}))
)
const StateCombobox = lazy(() =>
	import('@/entities/locations/state/infra/ui/StateComboBox').then(m => ({
		default: m.StateCombobox
	}))
)
const CityCombobox = lazy(() =>
	import('@/entities/locations/city/infra/ui/CityComboBox').then(m => ({
		default: m.CityCombobox
	}))
)

interface SiteInputsProps {
	formData: DefaultSite
	errors: SiteErrors
	required: SiteRequired
	mode: FormMode
	isLoading: boolean
	handleChange: (name: Action['type'], value: string | number) => void
}

export const SiteInputs = memo(
	({ errors, mode, required, formData, isLoading, handleChange }: SiteInputsProps) => {
		return (
			<>
				<RegionCombobox
					value={formData.regionId}
					handleChange={(_name, value) => handleChange('regionId', value)}
					name="regionId"
					isLoading={isLoading}
					required={required.regionId}
					readonly={mode === 'edit'}
				/>
				<StateCombobox
					value={formData.stateId}
					handleChange={(_name, value) => handleChange('stateId', value)}
					name="stateId"
					isLoading={isLoading}
					regionId={formData.regionId}
					required={required.stateId}
					readonly={mode === 'edit'}
				/>
				<CityCombobox
					value={formData.cityId}
					handleChange={(_name, value) => handleChange('cityId', value)}
					name="cityId"
					isLoading={isLoading}
					regionId={formData.regionId}
					stateId={formData.stateId}
					required={required.stateId}
					readonly={mode === 'edit'}
				/>
				<Input
					id="site-address"
					value={formData.address}
					name="address"
					isLoading={isLoading}
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
					isLoading={isLoading}
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
	}
)

SiteInputs.displayName = 'SiteInputs'
