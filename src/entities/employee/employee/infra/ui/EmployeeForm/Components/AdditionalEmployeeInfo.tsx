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
const DepartamentoCombobox = lazy(() =>
	import('@/entities/employee/departamento/infra/ui/DepartamentoComboBox').then(m => ({
		default: m.DepartamentoCombobox
	}))
)
const LocationCombobox = lazy(() =>
	import('@/entities/locations/locations/infra/ui/LocationComboBox').then(m => ({
		default: m.LocationCombobox
	}))
)
const DirectivaCombobox = lazy(() =>
	import('@/entities/employee/directiva/infra/ui/DirectivaComboBox').then(m => ({
		default: m.DirectivaCombobox
	}))
)
const VicepresidenciaCombobox = lazy(() =>
	import('@/entities/employee/vicepresidencia/infra/ui/VicepresidenciaComboBox').then(m => ({
		default: m.VicepresidenciaCombobox
	}))
)
const VicepresidenciaEjecutivaCombobox = lazy(() =>
	import('@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaComboBox').then(
		m => ({ default: m.VicepresidenciaEjecutivaCombobox })
	)
)
const PhoneSection = lazy(() => import('./PhoneSection').then(m => ({ default: m.PhoneSection })))
const ExtensionSection = lazy(() =>
	import('./ExtensionSection').then(m => ({ default: m.ExtensionSection }))
)
interface AdditionalEmployeeInfoProps {
	isLoading: boolean
	canEdit: boolean
	locationId: DefaultEmployee['locationId']
	directivaId: DefaultEmployee['directivaId']
	vicepresidenciaEjecutivaId: DefaultEmployee['vicepresidenciaEjecutivaId']
	vicepresidenciaId: DefaultEmployee['vicepresidenciaId']
	departamentoId: DefaultEmployee['departamentoId']
	cargoId: DefaultEmployee['cargoId']
	phone: DefaultEmployee['phone']
	phoneSegments: Helpers['phoneSegments']
	extension: DefaultEmployee['extension']
	extensionSegments: Helpers['extensionSegments']
	locationIdRequired: EmployeeRequired['locationId']
	directivaIdRequired: EmployeeRequired['directivaId']
	vicepresidenciaEjecutivaIdRequired: EmployeeRequired['vicepresidenciaEjecutivaId']
	vicepresidenciaIdRequired: EmployeeRequired['vicepresidenciaId']
	departamentoIdRequired: EmployeeRequired['departamentoId']
	cargoIdRequired: EmployeeRequired['cargoId']
	locationIdDisabled: EmployeeDisabled['locationId']
	directivaIdDisabled: EmployeeDisabled['directivaId']
	vicepresidenciaEjecutivaIdDisabled: EmployeeDisabled['vicepresidenciaEjecutivaId']
	vicepresidenciaIdDisabled: EmployeeDisabled['vicepresidenciaId']
	departamentoIdDisabled: EmployeeDisabled['departamentoId']
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
		departamentoId,
		directivaId,
		extension,
		extensionSegments,
		locationId,
		phone,
		phoneSegments,
		vicepresidenciaEjecutivaId,
		vicepresidenciaId,
		locationIdRequired,
		directivaIdRequired,
		vicepresidenciaEjecutivaIdRequired,
		vicepresidenciaIdRequired,
		departamentoIdRequired,
		cargoIdRequired,
		locationIdDisabled,
		directivaIdDisabled,
		vicepresidenciaEjecutivaIdDisabled,
		vicepresidenciaIdDisabled,
		departamentoIdDisabled,
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
				<DirectivaCombobox
					value={directivaId ?? ''}
					handleChange={(_name, value) => handleChange('directivaId', value)}
					name="directivaId"
					isLoading={isLoading}
					required={directivaIdRequired}
					disabled={directivaIdDisabled}
					readonly={!canEdit}
				/>
				<VicepresidenciaEjecutivaCombobox
					value={vicepresidenciaEjecutivaId ?? ''}
					handleChange={(_name, value) =>
						handleChange('vicepresidenciaEjecutivaId', value)
					}
					name="vicepresidenciaEjecutivaId"
					isLoading={isLoading}
					directivaId={directivaId ?? ''}
					required={vicepresidenciaEjecutivaIdRequired}
					disabled={vicepresidenciaEjecutivaIdDisabled}
					readonly={!canEdit}
				/>
				<VicepresidenciaCombobox
					value={vicepresidenciaId ?? ''}
					vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId ?? ''}
					handleChange={(_name, value) => handleChange('vicepresidenciaId', value)}
					name="vicepresidenciaId"
					required={vicepresidenciaIdRequired}
					disabled={vicepresidenciaIdDisabled}
					readonly={!canEdit}
					isLoading={isLoading}
				/>
				<DepartamentoCombobox
					value={departamentoId ?? ''}
					vicepresidenciaId={vicepresidenciaId ?? ''}
					handleChange={(_name, value) => handleChange('departamentoId', value)}
					name="departamentoId"
					required={departamentoIdRequired}
					disabled={departamentoIdDisabled}
					isLoading={isLoading}
					readonly={!canEdit}
				/>
				<CargoCombobox
					value={cargoId ?? ''}
					handleChange={(_name, value) => handleChange('cargoId', value)}
					name="cargoId"
					directivaId={directivaId ?? ''}
					vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId ?? ''}
					vicepresidenciaId={vicepresidenciaId ?? ''}
					departamentoId={departamentoId ?? ''}
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
