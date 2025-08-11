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
	isLoading: boolean
	/**
	 * The ID of the employee's location.
	 */
	locationId: DefaultEmployee['locationId']
	/**
	 * The ID of the employee's directiva.
	 */
	directivaId: DefaultEmployee['directivaId']
	/**
	 * The ID of the employee's executive vicepresidencia.
	 */
	vicepresidenciaEjecutivaId: DefaultEmployee['vicepresidenciaEjecutivaId']
	/**
	 * The ID of the employee's vicepresidencia.
	 */
	vicepresidenciaId: DefaultEmployee['vicepresidenciaId']
	/**
	 * The ID of the employee's departamento.
	 */
	departamentoId: DefaultEmployee['departamentoId']
	/**
	 * The ID of the employee's cargo.
	 */
	cargoId: DefaultEmployee['cargoId']
	/**
	 * An array of the employee's phone numbers.
	 */
	phone: DefaultEmployee['phone']
	/**
	 * An array of segmented phone numbers (operadora and numero).
	 */
	phoneSegments: DefaultEmployee['phoneSegments']
	/**
	 * An array of the employee's extensions.
	 */
	extension: DefaultEmployee['extension']
	/**
	 * An array of segmented extensions (operadora and numero).
	 */
	extensionSegments: DefaultEmployee['extensionSegments']
	/**
	 * Indicates if the locationId field is required.
	 */
	locationIdRequired: EmployeeRequired['locationId']
	/**
	 * Indicates if the directivaId field is required.
	 */
	directivaIdRequired: EmployeeRequired['directivaId']
	/**
	 * Indicates if the vicepresidenciaEjecutivaId field is required.
	 */
	vicepresidenciaEjecutivaIdRequired: EmployeeRequired['vicepresidenciaEjecutivaId']
	/**
	 * Indicates if the vicepresidenciaId field is required.
	 */
	vicepresidenciaIdRequired: EmployeeRequired['vicepresidenciaId']
	/**
	 * Indicates if the departamentoId field is required.
	 */
	departamentoIdRequired: EmployeeRequired['departamentoId']
	/**
	 * Indicates if the cargoId field is required.
	 */
	cargoIdRequired: EmployeeRequired['cargoId']
	/**
	 * Indicates if the locationId field is disabled.
	 */
	locationIdDisabled: EmployeeDisabled['locationId']
	/**
	 * Indicates if the directivaId field is disabled.
	 */
	directivaIdDisabled: EmployeeDisabled['directivaId']
	/**
	 * Indicates if the vicepresidenciaEjecutivaId field is disabled.
	 */
	vicepresidenciaEjecutivaIdDisabled: EmployeeDisabled['vicepresidenciaEjecutivaId']
	/**
	 * Indicates if the vicepresidenciaId field is disabled.
	 */
	vicepresidenciaIdDisabled: EmployeeDisabled['vicepresidenciaId']
	/**
	 * Indicates if the departamentoId field is disabled.
	 */
	departamentoIdDisabled: EmployeeDisabled['departamentoId']
	/**
	 * Indicates if the cargoId field is disabled.
	 */
	cargoIdDisabled: EmployeeDisabled['cargoId']
	/**
	 * Callback function to handle changes in form input fields.
	 * @param name - The name of the field being changed.
	 * @param value - The new value of the field.
	 */
	handleChange: (name: Action['type'], value: any) => void
	/**
	 * Callback function to add new phone or extension fields.
	 * @param params - An object specifying whether to add a 'phone' or 'extension'.
	 */
	handleAddPhones: ({ type }: { type: 'addPhone' | 'addExtension' }) => void
	/**
	 * Callback function to clear the first phone or extension field.
	 * @param params - An object specifying the type and index of the field to clear.
	 */
	handleClearFirstPhone: ({
		type,
		index
	}: {
		type: 'clearPhone' | 'clearExtension'
		index: number
	}) => void
	/**
	 * Callback function to handle changes in phone number or extension segments.
	 * @param params - An object specifying the type, index, and new value of the segment.
	 */
	handlePhoneChange: ({
		type,
		index,
		value
	}: {
		type: 'phoneNumero' | 'phoneOperadora' | 'extensionNumero' | 'extensionOperadora'
		index: number
		value: string
	}) => void
	/**
	 * Callback function to remove phone or extension fields.
	 * @param params - An object specifying the type and index of the field to remove.
	 */
	handleRemovePhones: ({
		type,
		index
	}: {
		type: 'removePhone' | 'removeExtension'
		index: number
	}) => void
}

/**
 * `AdditionalEmployeeInfo` is a memoized functional component that renders additional input fields
 * for employee information, including location, organizational hierarchy (directiva, vicepresidencia, departamento, cargo),
 * and phone/extension details. It uses various combobox components and dedicated sections for phone and extension inputs.
 */
export const AdditionalEmployeeInfo = memo(
	({
		handleAddPhones,
		handleChange,
		handleClearFirstPhone,
		handlePhoneChange,
		handleRemovePhones,
		isLoading,
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
				/>
				<DirectivaCombobox
					value={directivaId ?? ''}
					handleChange={(_name, value) => handleChange('directivaId', value)}
					name="directivaId"
					isLoading={isLoading}
					required={directivaIdRequired}
					disabled={directivaIdDisabled}
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
				/>
				<VicepresidenciaCombobox
					value={vicepresidenciaId ?? ''}
					vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId ?? ''}
					handleChange={(_name, value) => handleChange('vicepresidenciaId', value)}
					name="vicepresidenciaId"
					required={vicepresidenciaIdRequired}
					disabled={vicepresidenciaIdDisabled}
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
				/>

				<PhoneSection
					handleAddPhones={handleAddPhones}
					handleClearFirstPhone={handleClearFirstPhone}
					handlePhoneChange={handlePhoneChange}
					handleRemovePhones={handleRemovePhones}
					phones={phone}
					phoneSegments={phoneSegments}
					isLoading={isLoading}
				/>
				<ExtensionSection
					handleAddPhones={handleAddPhones}
					handleClearFirstPhone={handleClearFirstPhone}
					handlePhoneChange={handlePhoneChange}
					handleRemovePhones={handleRemovePhones}
					extension={extension}
					extensionSegments={extensionSegments}
					isLoading={isLoading}
				/>
			</div>
		)
	}
)
