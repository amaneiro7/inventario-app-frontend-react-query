import { memo } from 'react'
import { CargoCombobox } from '@/entities/employee/cargo/infra/ui/CargoComboBox'
import { DepartamentoCombobox } from '@/entities/employee/departamento/infra/ui/DepartamentoComboBox'
import { LocationCombobox } from '@/entities/locations/locations/infra/ui/LocationComboBox'
import { DirectivaCombobox } from '@/entities/employee/directiva/infra/ui/DirectivaComboBox'
import { VicepresidenciaCombobox } from '@/entities/employee/vicepresidencia/infra/ui/VicepresidenciaComboBox'
import { VicepresidenciaEjecutivaCombobox } from '@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaComboBox'
import Typography from '@/shared/ui/Typography'
import { PhoneSection } from './PhoneSection'
import { ExtensionSection } from './ExtensionSection'
import {
	type DefaultEmployee,
	type EmployeeRequired,
	type Action,
	EmployeeDisabled
} from '@/entities/employee/employee/infra/reducers/employeeFormReducer'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'

interface AdditionalEmployeeInfoProps {
	locationId: DefaultEmployee['locationId']
	directivaId: DefaultEmployee['directivaId']
	vicepresidenciaEjecutivaId: DefaultEmployee['vicepresidenciaEjecutivaId']
	vicepresidenciaId: DefaultEmployee['vicepresidenciaId']
	departamentoId: DefaultEmployee['departamentoId']
	cargoId: DefaultEmployee['cargoId']
	phone: DefaultEmployee['phone']
	phoneSegments: DefaultEmployee['phoneSegments']
	extension: DefaultEmployee['extension']
	extensionSegments: DefaultEmployee['extensionSegments']
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
			<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
				<Typography color="azul" variant="h5">
					Información adicional del usuario
				</Typography>

				<LocationCombobox
					value={locationId ?? ''}
					handleChange={(_name, value) => handleChange('locationId', value)}
					name="locationId"
					method="search"
					statusId={StatusOptions.INUSE} // se coloca asi para que solo aparaceran las ubicaciones de agencia y torres
					required={locationIdRequired}
					disabled={locationIdDisabled}
				/>
				<DirectivaCombobox
					value={directivaId ?? ''}
					handleChange={(_name, value) => handleChange('directivaId', value)}
					name="directivaId"
					required={directivaIdRequired}
					disabled={directivaIdDisabled}
				/>
				<VicepresidenciaEjecutivaCombobox
					value={vicepresidenciaEjecutivaId ?? ''}
					handleChange={(_name, value) =>
						handleChange('vicepresidenciaEjecutivaId', value)
					}
					name="vicepresidenciaEjecutivaId"
					directivaId={directivaId ?? ''}
					required={vicepresidenciaEjecutivaIdRequired}
					disabled={vicepresidenciaEjecutivaIdDisabled}
				/>
				<VicepresidenciaCombobox
					value={vicepresidenciaId ?? ''}
					vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId ?? ''}
					handleChange={(_name, value) => handleChange('vicepresidenciaId', value)}
					name="vicepresidenciaId"
					required={vicepresidenciaIdRequired}
					disabled={vicepresidenciaIdDisabled}
				/>
				<DepartamentoCombobox
					value={departamentoId ?? ''}
					vicepresidenciaId={vicepresidenciaId ?? ''}
					handleChange={(_name, value) => handleChange('departamentoId', value)}
					name="departamentoId"
					required={departamentoIdRequired}
					disabled={departamentoIdDisabled}
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
				/>

				<PhoneSection
					handleAddPhones={handleAddPhones}
					handleClearFirstPhone={handleClearFirstPhone}
					handlePhoneChange={handlePhoneChange}
					handleRemovePhones={handleRemovePhones}
					phones={phone}
					phoneSegments={phoneSegments}
				/>
				<ExtensionSection
					handleAddPhones={handleAddPhones}
					handleClearFirstPhone={handleClearFirstPhone}
					handlePhoneChange={handlePhoneChange}
					handleRemovePhones={handleRemovePhones}
					extension={extension}
					extensionSegments={extensionSegments}
				/>
			</div>
		)
	}
)
