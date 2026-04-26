import { lazy, memo } from 'react'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type LocationErrors,
	type DefaultLocation,
	type LocationRequired,
	type LocationDisabled
} from '@/entities/locations/locations/infra/reducers/locationFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

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
const AgencyClassificationCombobox = lazy(() =>
	import('@/entities/locations/locations/infra/ui/AgencyClassificationCombobox').then(m => ({
		default: m.AgencyClassificationCombobox
	}))
)
const ISPLinkTransferList = lazy(() =>
	import('@/entities/locations/ispLinks/infra/ui/ISPLinkTransferList').then(m => ({
		default: m.ISPLinkTransferList
	}))
)

interface LocationInputsProps {
	formData: DefaultLocation
	errors: LocationErrors
	required: LocationRequired
	disabled: LocationDisabled
	mode: FormMode
	isLoading: boolean
	canEdit: boolean
	handleChange: (name: Action['type'], value: string | number) => void
	handleSite: ({ value, siteName }: { value: string; siteName: string }) => void
}

export const LocationInputs = memo(
	({
		errors,
		mode,
		required,
		disabled,
		isLoading,
		formData,
		canEdit,
		handleChange,
		handleSite
	}: LocationInputsProps) => {
		return (
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Sección 1: Clasificación Principal */}
				<TypeOfSiteCombobox
					value={formData.typeOfSiteId}
					handleChange={(_name, value) => handleChange('typeOfSiteId', value)}
					name="typeOfSiteId"
					isLoading={isLoading}
					required={required.typeOfSiteId}
					disabled={disabled.typeOfSiteId}
					readonly={mode === 'edit' || !canEdit}
				/>
				<LocationStatusCombobox
					value={formData.locationStatusId}
					handleChange={(_name, value) => handleChange('locationStatusId', value)}
					name="locationStatusId"
					isLoading={isLoading}
					required={required.locationStatusId}
					disabled={disabled.locationStatusId}
					readonly={!canEdit}
				/>

				{/* Sección 2: Jerarquía Geográfica */}
				<RegionCombobox
					value={formData.regionId}
					handleChange={(_name, value) => handleChange('regionId', value)}
					name="regionId"
					isLoading={isLoading}
					required={required.regionId}
					disabled={disabled.regionId}
					readonly={mode === 'edit' || !canEdit}
				/>
				<StateCombobox
					value={formData.stateId}
					handleChange={(_name, value) => handleChange('stateId', value)}
					name="stateId"
					isLoading={isLoading}
					regionId={formData.regionId}
					required={required.stateId}
					disabled={disabled.stateId}
					readonly={mode === 'edit' || !canEdit}
				/>
				<CityCombobox
					value={formData.cityId}
					handleChange={(_name, value) => handleChange('cityId', value)}
					name="cityId"
					isLoading={isLoading}
					regionId={formData.regionId}
					stateId={formData.stateId}
					required={required.cityId}
					disabled={disabled.cityId}
					readonly={mode === 'edit' || !canEdit}
				/>
				<SiteCombobox
					value={formData.siteId}
					handleFormChange={handleSite}
					name="siteId"
					isLoading={isLoading}
					method="form"
					regionId={formData.regionId}
					stateId={formData.stateId}
					cityId={formData.cityId}
					required={required.siteId}
					disabled={disabled.siteId}
					readonly={mode === 'edit' || !canEdit}
				/>
				{/* Sección 3: Identificación (Aquí usamos col-span para balancear) */}
				<Input
					id="location-name"
					className="md:col-span-2"
					value={formData.name}
					name="name"
					isLoading={isLoading}
					label="Nombre de la ubicación"
					readOnly={!canEdit}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					disabled={disabled.name}
					required={required.name}
				/>
				{/* Condicionales que se adaptan al grid */}
				{mode === 'add' && formData.typeOfSiteId === TypeOfSiteOptions.AGENCY && (
					<Input
						id="codeAgency"
						value={formData.codeAgency ?? 1}
						name="codeAgency"
						isLoading={isLoading}
						label="Código de agencia"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('codeAgency', e.target.value)
						}
						type="number"
						readOnly={!canEdit}
						max={599}
						min={1}
						error={!!errors?.codeAgency}
						errorMessage={errors?.codeAgency}
						required={required.codeAgency}
					/>
				)}
				{formData.typeOfSiteId === TypeOfSiteOptions.AGENCY && (
					<AgencyClassificationCombobox
						value={formData.agencyClassification ?? ''}
						handleChange={(_name, value) => handleChange('agencyClassification', value)}
						name="agencyClassification"
						error={errors?.agencyClassification}
						required={required.agencyClassification}
						disabled={disabled.agencyClassification}
						readonly={!canEdit}
					/>
				)}

				<Input
					id="location-subnet"
					className="md:col-span-2"
					value={formData.subnet ?? ''}
					name="subnet"
					isLoading={isLoading}
					label="Subnet"
					readOnly={!canEdit}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('subnet', e.target.value)
					}
					error={!!errors?.subnet}
					errorMessage={errors?.subnet}
					required={required.subnet}
					disabled={disabled.subnet}
				/>
				{/* Sección 4: Listas complejas al final */}
				{formData.typeOfSiteId === TypeOfSiteOptions.AGENCY && (
					<div className="md:col-span-2">
						<ISPLinkTransferList
							value={formData.isplinks}
							name="ispLinks"
							readonly={!canEdit}
							onAddISPLink={handleChange}
							onRemoveISPLink={handleChange}
							required={required.cargos}
							disabled={disabled.cargos}
							isLoading={isLoading}
						/>
					</div>
				)}
			</div>
		)
	}
)

LocationInputs.displayName = 'LocationInputs'
