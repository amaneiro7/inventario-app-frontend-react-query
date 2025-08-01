/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import {
	type Action,
	type EmployeeErrors,
	type DefaultEmployee,
	type EmployeeRequired,
	type EmployeeDisabled
} from '@/entities/employee/employee/infra/reducers/employeeFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

import { MainEmployeeInfo } from './MainEmployeeInfo'
import { AdditionalEmployeeInfo } from './AdditionalEmployeeInfo'

interface Props {
	formData: DefaultEmployee
	errors: EmployeeErrors
	required: EmployeeRequired
	disabled: EmployeeDisabled
	mode: FormMode
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

export const EmployeeInputs = memo(
	({
		errors,
		required,
		disabled,
		formData,
		mode,
		handleChange,
		handleAddPhones,
		handleClearFirstPhone,
		handlePhoneChange,
		handleRemovePhones
	}: Props) => {
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
