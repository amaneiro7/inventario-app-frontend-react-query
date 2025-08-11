import { memo } from 'react'
import { MainEmployeeInfo } from './Components/MainEmployeeInfo'
import { AdditionalEmployeeInfo } from './Components/AdditionalEmployeeInfo'
import {
	type Action,
	type EmployeeErrors,
	type DefaultEmployee,
	type EmployeeRequired,
	type EmployeeDisabled
} from '@/entities/employee/employee/infra/reducers/employeeFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

interface EmployeeInputsProps {
	/**
	 * The current form data for the employee.
	 */
	formData: DefaultEmployee
	/**
	 * An object containing validation errors for each form field.
	 */
	errors: EmployeeErrors
	/**
	 * An object indicating which form fields are required.
	 */
	required: EmployeeRequired
	/**
	 * An object indicating which form fields are disabled.
	 */
	isLoading: boolean
	/**
	 * An object indicating which form fields is loading.
	 */
	disabled: EmployeeDisabled
	/**
	 * The current mode of the form (e.g., 'add' or 'edit').
	 */
	mode: FormMode
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
 * `EmployeeInputs` is a memoized component that renders the main and additional input sections
 * for the employee form. It receives form data, errors, required/disabled states, and handlers
 * as props and passes them down to its child components.
 */
export const EmployeeInputs = memo(
	({
		errors,
		required,
		disabled,
		formData,
		mode,
		isLoading,
		handleChange,
		handleAddPhones,
		handleClearFirstPhone,
		handlePhoneChange,
		handleRemovePhones
	}: EmployeeInputsProps) => {
		return (
			<div className="flex flex-col gap-4">
				{/* Informacion Principal */}
				<div className="grid grid-cols-2 gap-5">
					<MainEmployeeInfo
						userName={formData.userName}
						type={formData.type}
						isStillWorking={formData.isStillWorking}
						name={formData.name}
						lastName={formData.lastName}
						email={formData.email}
						employeeCode={formData.employeeCode}
						cedula={formData.cedula}
						nationality={formData.nationality}
						mode={mode}
						isLoading={isLoading}
						userNameRequired={required.userName}
						typeRequired={required.type}
						nameRequired={required.name}
						lastNameRequired={required.lastName}
						emailRequired={required.email}
						employeeCodeRequired={required.employeeCode}
						cedulaRequired={required.cedula}
						userNameDisabled={disabled.userName}
						typeDisabled={disabled.type}
						nameDisabled={disabled.name}
						lastNameDisabled={disabled.lastName}
						emailDisabled={disabled.email}
						employeeCodeDisabled={disabled.employeeCode}
						cedulaDisabled={disabled.cedula}
						nationalityDisabled={disabled.nationality}
						userNameError={errors.userName}
						nameError={errors.name}
						lastNameError={errors.lastName}
						emailError={errors.email}
						employeeCodeError={errors.employeeCode}
						cedulaError={errors.cedula}
						typeError={errors.type}
						handleChange={handleChange}
					/>
					<AdditionalEmployeeInfo
						handleAddPhones={handleAddPhones}
						handleChange={handleChange}
						handleClearFirstPhone={handleClearFirstPhone}
						handleRemovePhones={handleRemovePhones}
						handlePhoneChange={handlePhoneChange}
						isLoading={isLoading}
						locationId={formData.locationId}
						directivaId={formData.directivaId}
						vicepresidenciaEjecutivaId={formData.vicepresidenciaEjecutivaId}
						vicepresidenciaId={formData.vicepresidenciaId}
						departamentoId={formData.departamentoId}
						cargoId={formData.cargoId}
						phone={formData.phone}
						phoneSegments={formData.phoneSegments}
						extension={formData.extension}
						extensionSegments={formData.extensionSegments}
						locationIdRequired={required.locationId}
						directivaIdRequired={required.directivaId}
						vicepresidenciaEjecutivaIdRequired={required.vicepresidenciaEjecutivaId}
						vicepresidenciaIdRequired={required.vicepresidenciaId}
						departamentoIdRequired={required.departamentoId}
						cargoIdRequired={required.cargoId}
						locationIdDisabled={disabled.locationId}
						directivaIdDisabled={disabled.directivaId}
						vicepresidenciaEjecutivaIdDisabled={disabled.vicepresidenciaEjecutivaId}
						vicepresidenciaIdDisabled={disabled.vicepresidenciaId}
						departamentoIdDisabled={disabled.departamentoId}
						cargoIdDisabled={disabled.cargoId}
					/>
				</div>
			</div>
		)
	}
)

EmployeeInputs.displayName = 'EmployeeInputs'
