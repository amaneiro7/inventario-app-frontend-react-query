import { lazy, memo } from 'react'
import Typography from '@/shared/ui/Typography'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import {
	type DefaultEmployee,
	type EmployeeRequired,
	type Action,
	type EmployeeDisabled,
	type Helpers
} from '@/entities/employee/employee/infra/reducers/employeeFormReducer'

const CargoCombobox = lazy(() =>
	import('@/entities/employee/cargo/infra/ui/CargoComboBox').then(m => ({
		default: m.CargoCombobox
	}))
)
const LocationCombobox = lazy(() =>
	import('@/entities/locations/locations/infra/ui/LocationComboBox').then(m => ({
		default: m.LocationCombobox
	}))
)
const UnidadCombobox = lazy(() =>
	import('@/entities/employee/unidad/infra/ui/UnidadComboBox').then(m => ({
		default: m.UnidadCombobox
	}))
)

const PhoneSection = lazy(() => import('./PhoneSection').then(m => ({ default: m.PhoneSection })))
const ExtensionSection = lazy(() =>
	import('./ExtensionSection').then(m => ({ default: m.ExtensionSection }))
)
interface AdditionalEmployeeInfoProps {
	isLoading: boolean
	canEdit: boolean
	locationId: DefaultEmployee['locationId']
	unidadId: DefaultEmployee['unidadId']
	cargoId: DefaultEmployee['cargoId']
	phone: DefaultEmployee['phone']
	phoneSegments: Helpers['phoneSegments']
	extension: DefaultEmployee['extension']
	extensionSegments: Helpers['extensionSegments']
	locationIdRequired: EmployeeRequired['locationId']
	unidadIdRequired: EmployeeRequired['unidadId']
	cargoIdRequired: EmployeeRequired['cargoId']
	locationIdDisabled: EmployeeDisabled['locationId']
	unidadIdDisabled: EmployeeDisabled['unidadId']
	cargoIdDisabled: EmployeeDisabled['cargoId']
	handleChange: (name: Action['type'], value: any) => void
	handleAddPhones: ({ type }: { type: 'addPhone' | 'addExtension' }) => void
	handleClearFirstPhone: ({
		type,
		index
	}: {
		type: 'clearPhone' | 'clearExtension'
		index: number
	}) => void
	handlePhoneChange: ({
		type,
		index,
		value
	}: {
		type: 'phoneNumero' | 'phoneOperadora' | 'extensionNumero' | 'extensionOperadora'
		index: number
		value: string
	}) => void
	handleRemovePhones: ({
		type,
		index
	}: {
		type: 'removePhone' | 'removeExtension'
		index: number
	}) => void
}

export const AdditionalEmployeeInfo = memo(
	({
		handleAddPhones,
		handleChange,
		handleClearFirstPhone,
		handlePhoneChange,
		handleRemovePhones,
		isLoading,
		canEdit,
		cargoId,
		unidadId,
		extension,
		extensionSegments,
		locationId,
		phone,
		phoneSegments,
		locationIdRequired,
		unidadIdRequired,
		cargoIdRequired,
		locationIdDisabled,
		unidadIdDisabled,

		cargoIdDisabled
	}: AdditionalEmployeeInfoProps) => {
		return (
			<div className="flex flex-col gap-2 rounded-lg border border-gray-400 p-8 pt-4">
				<Typography color="azul" variant="h5">
					Información adicional del usuario
				</Typography>

				<LocationCombobox
					value={locationId ?? ''}
					handleChange={(_name, value) => handleChange('locationId', value)}
					name="locationId"
					method="search"
					isLoading={isLoading}
					statusId={StatusOptions.INUSE} // se coloca asi para que solo aparaceran las ubicaciones de agencia y torres
					required={locationIdRequired}
					disabled={locationIdDisabled}
					readonly={!canEdit}
				/>
				<UnidadCombobox
					value={unidadId ?? ''}
					handleChange={(_name, value) => handleChange('unidadId', value)}
					method="search"
					name="unidadId"
					isLoading={isLoading}
					required={unidadIdRequired}
					disabled={unidadIdDisabled}
					readonly={!canEdit}
				/>
				<CargoCombobox
					value={cargoId ?? ''}
					handleChange={(_name, value) => handleChange('cargoId', value)}
					name="cargoId"
					unidadId={unidadId ?? ''}
					required={cargoIdRequired}
					disabled={cargoIdDisabled}
					isLoading={isLoading}
					readonly={!canEdit}
				/>

				<PhoneSection
					handleAddPhones={handleAddPhones}
					handleClearFirstPhone={handleClearFirstPhone}
					handlePhoneChange={handlePhoneChange}
					handleRemovePhones={handleRemovePhones}
					phones={phone}
					phoneSegments={phoneSegments}
					isLoading={isLoading}
					readOnly={!canEdit}
				/>
				<ExtensionSection
					handleAddPhones={handleAddPhones}
					handleClearFirstPhone={handleClearFirstPhone}
					handlePhoneChange={handlePhoneChange}
					handleRemovePhones={handleRemovePhones}
					extension={extension}
					extensionSegments={extensionSegments}
					isLoading={isLoading}
					readOnly={!canEdit}
				/>
			</div>
		)
	}
)
