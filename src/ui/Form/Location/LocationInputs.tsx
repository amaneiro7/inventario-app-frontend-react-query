import { memo } from 'react'
import { Input } from '@/components/Input/Input'
import {
	type Action,
	type LocationErrors,
	type DefaultLocation,
	type LocationRequired
} from '@/core/locations/locations/infra/reducers/locationFormReducer'
import { RegionCombobox } from '@/components/ComboBox/Sincrono/RegionComboBox'
import { StateCombobox } from '@/components/ComboBox/Sincrono/StateComboBox'
import { CityCombobox } from '@/components/ComboBox/Asincrono/CityComboBox'
import { FormMode } from '@/hooks/useGetFormMode'
import { SiteCombobox } from '@/components/ComboBox/Asincrono/SiteCombobox'
import { TypeOfSiteCombobox } from '@/components/ComboBox/Sincrono/TypeOfSiteComboBox'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'

interface Props {
	formData: DefaultLocation
	errors: LocationErrors
	required: LocationRequired
	mode: FormMode
	handleChange: (name: Action['type'], value: string | number) => void
	handleSite: ({ value, siteName }: { value: string; siteName: string }) => void
}

export const LocationInputs = memo(function ({
	errors,
	mode,
	required,
	formData,
	handleChange,
	handleSite
}: Props) {
	return (
		<>
			<TypeOfSiteCombobox
				value={formData.typeOfSiteId}
				handleChange={(_name, value) => handleChange('typeOfSiteId', value)}
				name="typeOfSiteId"
				required={required.typeOfSiteId}
				readonly={mode === 'edit'}
			/>
			<div className="flex gap-4">
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
			</div>
			<div className="flex gap-4">
				<CityCombobox
					value={formData.cityId}
					handleChange={(_name, value) => handleChange('cityId', value)}
					name="cityId"
					regionId={formData.regionId}
					stateId={formData.stateId}
					required={required.stateId}
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
					required={required.stateId}
					readonly={mode === 'edit'}
				/>
			</div>
			<div className="flex gap-4">
				{mode === 'add' && formData.typeOfSiteId === TypeOfSiteOptions.AGENCY ? (
					<Input
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
					value={formData.name}
					name="name"
					label="Nombre de la ubicación"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required={required.name}
				/>
			</div>
			<Input
				value={formData.subnet ?? ''}
				name="subnet"
				label="Subnet"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('subnet', e.target.value)
				}
				error={!!errors?.subnet}
				errorMessage={errors?.subnet}
				required={required.subnet}
			/>
		</>
	)
})
