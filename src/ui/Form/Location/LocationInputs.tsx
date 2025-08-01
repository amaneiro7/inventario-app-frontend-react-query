import { lazy, memo } from 'react'
import {
	type Action,
	type LocationErrors,
	type DefaultLocation,
	type LocationRequired,
	type LocationDisabled
} from '@/entities/locations/locations/infra/reducers/locationFormReducer'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Input } from '@/shared/ui/Input/Input'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

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
const SiteCombobox = lazy(() =>
	import('@/entities/locations/site/infra/ui/SiteCombobox').then(m => ({
		default: m.SiteCombobox
	}))
)
const TypeOfSiteCombobox = lazy(() =>
	import('@/entities/locations/typeOfSites/infra/ui/TypeOfSiteComboBox').then(m => ({
		default: m.TypeOfSiteCombobox
	}))
)
const LocationStatusCombobox = lazy(() =>
	import('@/entities/locations/locationStatus/infra/ui/LocationStatusComboBox').then(m => ({
		default: m.LocationStatusCombobox
	}))
)

interface Props {
	formData: DefaultLocation
	errors: LocationErrors
	required: LocationRequired
	disabled: LocationDisabled
	mode: FormMode
	handleChange: (name: Action['type'], value: string | number) => void
	handleSite: ({ value, siteName }: { value: string; siteName: string }) => void
}

export const LocationInputs = memo(function ({
	errors,
	mode,
	required,
	disabled,
	formData,
	handleChange,
	handleSite
}: Props) {
	return (
		<>
			<div className="flex gap-4">
				<TypeOfSiteCombobox
					value={formData.typeOfSiteId}
					handleChange={(_name, value) => handleChange('typeOfSiteId', value)}
					name="typeOfSiteId"
					required={required.typeOfSiteId}
					disabled={disabled.typeOfSiteId}
					readonly={mode === 'edit'}
				/>
				<LocationStatusCombobox
					value={formData.locationStatusId}
					handleChange={(_name, value) => handleChange('locationStatusId', value)}
					name="locationStatusId"
					required={required.locationStatusId}
					disabled={disabled.locationStatusId}
				/>
			</div>
			<div className="flex gap-4">
				<RegionCombobox
					value={formData.regionId}
					handleChange={(_name, value) => handleChange('regionId', value)}
					name="regionId"
					required={required.regionId}
					disabled={disabled.regionId}
					readonly={mode === 'edit'}
				/>
				<StateCombobox
					value={formData.stateId}
					handleChange={(_name, value) => handleChange('stateId', value)}
					name="stateId"
					regionId={formData.regionId}
					required={required.stateId}
					disabled={disabled.stateId}
					readonly={mode === 'edit'}
				/>
			</div>
			<div className="flex gap-4">
				<CityCombobox
					value={formData.cityId}
					handleChange={(_name, value) => handleChange('cityId', value)}
					name="cityId"
					regionId={formData.regionId}
					stateId={formData.stateId}
					required={required.cityId}
					disabled={disabled.cityId}
					readonly={mode === 'edit'}
				/>
				<SiteCombobox
					value={formData.siteId}
					handleFormChange={handleSite}
					name="siteId"
					method="form"
					regionId={formData.regionId}
					stateId={formData.stateId}
					cityId={formData.cityId}
					required={required.siteId}
					disabled={disabled.siteId}
					readonly={mode === 'edit'}
				/>
			</div>
			<div className="flex gap-4">
				{mode === 'add' && formData.typeOfSiteId === TypeOfSiteOptions.AGENCY ? (
					<Input
						id="codeAgency"
						value={formData.codeAgency ?? 1}
						name="codeAgency"
						label="Código de agencia"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('codeAgency', e.target.value)
						}
						type="number"
						max={599}
						min={1}
						error={!!errors?.codeAgency}
						errorMessage={errors?.codeAgency}
						required={required.codeAgency}
					/>
				) : null}

				<Input
					id="location-name"
					value={formData.name}
					name="name"
					label="Nombre de la ubicación"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					disabled={disabled.name}
					required={required.name}
				/>
			</div>
			<Input
				id="location-subnet"
				value={formData.subnet ?? ''}
				name="subnet"
				label="Subnet"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('subnet', e.target.value)
				}
				error={!!errors?.subnet}
				errorMessage={errors?.subnet}
				required={required.subnet}
				disabled={disabled.subnet}
			/>
		</>
	)
})
