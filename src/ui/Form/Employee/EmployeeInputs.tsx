/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
import { Input } from '@/components/Input/Input'
import {
	type Action,
	type EmployeeErrors,
	type DefaultEmployee,
	type EmployeeRequired,
	type EmployeeDisabled
} from '@/core/employee/employee/infra/reducers/employeeFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'
import Typography from '@/components/Typography'
import { EmployeeTypeCombobox } from '@/components/ComboBox/Sincrono/EmployeeTypeComboBox'
import { Checkbox } from '@/components/Checkbox/Checbox'
import { LocationCombobox } from '@/components/ComboBox/Asincrono/LocationComboBox'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { DepartamentoCombobox } from '@/components/ComboBox/Asincrono/DepartamentoComboBox'
import { CargoCombobox } from '@/components/ComboBox/Asincrono/CargoComboBox'
import { Nationalities } from '@/core/employee/employee/domain/value-object/EmployeeNationality'
import { EmployeeCedula } from '@/core/employee/employee/domain/value-object/EmployeeCedula'
import { ExtensionSection } from './ExtensionSection'
import { PhoneSection } from './PhoneSection'
import { DirectivaCombobox } from '@/components/ComboBox/Sincrono/DirectivaComboBox'
import { VicepresidenciaEjecutivaCombobox } from '@/components/ComboBox/Sincrono/VicepresidenciaEjecutivaComboBox'
import { VicepresidenciaCombobox } from '@/components/ComboBox/Sincrono/VicepresidenciaComboBox'

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

export const EmployeeInputs = ({
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
	const nacionalities = useMemo(() => {
		return Object.values(Nationalities).flatMap(opt => ({ id: opt }))
	}, [Nationalities])
	return (
		<div className="flex flex-col gap-4">
			{/* Informacion Principal */}
			<div className="grid grid-cols-2 gap-5">
				<div className="flex flex-col gap-4 border border-gray-400 rounded-lg p-8 pt-4">
					<Typography color="azul" variant="h5">
						Información principal del usuario
					</Typography>
					<Input
						value={formData.userName ?? ''}
						name="userName"
						label="Usuario"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('userName', e.target.value)
						}
						readOnly={mode === 'edit'}
						error={!!errors?.userName}
						errorMessage={errors?.userName}
						required={required.userName}
						disabled={disabled.userName}
					/>
					<EmployeeTypeCombobox
						value={formData.type}
						handleChange={(_name, value) => handleChange('type', value)}
						name="type"
						required={required.type}
						disabled={disabled.type}
						error={errors?.type}
						readonly={mode === 'edit'}
					/>
					<Checkbox
						value={formData.isStillWorking}
						name="isStillWorking"
						label="isStillWorking"
						text="¿Esta trabajando actualmente?"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('isStillWorking', e.target.checked)
						}
					/>
					<Typography color="azul" variant="h5">
						Datos del usuario
					</Typography>
					<div className="md:flex md:flex-row gap-4">
						<Input
							value={formData.name ?? ''}
							name="name"
							label="Nombres"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('name', e.target.value)
							}
							error={!!errors?.name}
							errorMessage={errors?.name}
							required={required.name}
							disabled={disabled.name}
						/>
						<Input
							value={formData.lastName ?? ''}
							name="lastName"
							label="Apellidos"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('lastName', e.target.value)
							}
							error={!!errors?.lastName}
							errorMessage={errors?.lastName}
							required={required.lastName}
							disabled={disabled.lastName}
						/>
					</div>
					<Input
						value={formData.email ?? ''}
						name="email"
						label="Correo electrónico"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('email', e.target.value)
						}
						error={!!errors?.email}
						errorMessage={errors?.email}
						required={required.email}
						disabled={disabled.email}
					/>
					<div className="md:grid md:grid-cols-2 gap-4">
						<Input
							value={formData.employeeCode ?? ''}
							name="employeeCode"
							label="Código de empleado"
							type="number"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('employeeCode', e.target.value)
							}
							min={1}
							readOnly={mode === 'edit'}
							error={!!errors?.employeeCode}
							errorMessage={errors?.employeeCode}
							required={required.employeeCode}
							disabled={disabled.employeeCode}
						/>

						<Input
							value={formData.cedula ?? ''}
							name="cedula"
							label="Cédula de Identidad"
							type="number"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('cedula', e.target.value)
							}
							error={!!errors?.cedula}
							errorMessage={errors?.cedula}
							required={required.cedula}
							disabled={disabled.cedula}
							min={EmployeeCedula.MIN}
							max={EmployeeCedula.MAX}
							readOnly={mode === 'edit'}
							selectInput={
								<select
									value={formData.nationality ?? ''}
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
										handleChange('nationality', e.target.value)
									}
									className="leftIcon focus:outline-none appearance-none"
									disabled={disabled.nationality || mode === 'edit'}
								>
									<option hidden value="default"></option>
									{nacionalities.map(op => (
										<option key={op.id} value={op.id}>
											{op.id}
										</option>
									))}
								</select>
							}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-4 border border-gray-400 rounded-lg p-8 pt-4">
					<Typography color="azul" variant="h5">
						Información adicional del usuario
					</Typography>

					<LocationCombobox
						value={formData.locationId ?? ''}
						handleChange={(_name, value) => handleChange('locationId', value)}
						name="locationId"
						method="search"
						statusId={StatusOptions.INUSE} // se coloca asi para que solo aparaceran las ubicaciones de agencia y torres
						required={required.locationId}
						disabled={disabled.locationId}
					/>
					<DirectivaCombobox
						value={formData.directivaId ?? ''}
						handleChange={(_name, value) => handleChange('directivaId', value)}
						name="directivaId"
						required={required.directivaId}
						disabled={disabled.directivaId}
					/>
					<VicepresidenciaEjecutivaCombobox
						value={formData.vicepresidenciaEjecutivaId ?? ''}
						handleChange={(_name, value) =>
							handleChange('vicepresidenciaEjecutivaId', value)
						}
						name="vicepresidenciaEjecutivaId"
						directivaId={formData.directivaId ?? ''}
						required={required.vicepresidenciaEjecutivaId}
						disabled={disabled.vicepresidenciaEjecutivaId}
					/>
					<VicepresidenciaCombobox
						value={formData.vicepresidenciaId ?? ''}
						vicepresidenciaEjecutivaId={formData.vicepresidenciaEjecutivaId ?? ''}
						handleChange={(_name, value) => handleChange('vicepresidenciaId', value)}
						name="vicepresidenciaId"
						required={required.vicepresidenciaId}
						disabled={disabled.vicepresidenciaId}
					/>
					<DepartamentoCombobox
						value={formData.departamentoId ?? ''}
						vicepresidenciaId={formData.vicepresidenciaId ?? ''}
						handleChange={(_name, value) => handleChange('departamentoId', value)}
						name="departamentoId"
						required={required.departamentoId}
						disabled={disabled.departamentoId}
					/>
					<CargoCombobox
						value={formData.cargoId ?? ''}
						handleChange={(_name, value) => handleChange('cargoId', value)}
						name="cargoId"
						directivaId={formData.directivaId ?? ''}
						vicepresidenciaEjecutivaId={formData.vicepresidenciaEjecutivaId ?? ''}
						vicepresidenciaId={formData.vicepresidenciaId ?? ''}
						departamentoId={formData.departamentoId ?? ''}
						required={required.cargoId}
						disabled={disabled.cargoId}
					/>

					<PhoneSection
						handleAddPhones={handleAddPhones}
						handleClearFirstPhone={handleClearFirstPhone}
						handlePhoneChange={handlePhoneChange}
						handleRemovePhones={handleRemovePhones}
						phones={formData.phone}
						phoneSegments={formData.phoneSegments}
					/>
					<ExtensionSection
						handleAddPhones={handleAddPhones}
						handleClearFirstPhone={handleClearFirstPhone}
						handlePhoneChange={handlePhoneChange}
						handleRemovePhones={handleRemovePhones}
						extension={formData.extension}
						extensionSegments={formData.extensionSegments}
					/>
				</div>
			</div>
		</div>
	)
}
