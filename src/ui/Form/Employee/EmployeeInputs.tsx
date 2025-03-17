/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useMemo } from 'react'
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
import { CentroTrabajoCombobox } from '@/components/ComboBox/Asincrono/CentroTrabajoComboBox'
import { DepartamentoCombobox } from '@/components/ComboBox/Asincrono/DepartamentoComboBox'
import { CargoCombobox } from '@/components/ComboBox/Asincrono/CargoComboBox'
import { Nationalities } from '@/core/employee/employee/domain/value-object/EmployeeNationality'
import { EmployeeCedula } from '@/core/employee/employee/domain/value-object/EmployeeCedula'
import { PhoneSection } from './PhoneSection'
import { ExtensionSection } from './ExtensionSection'

interface Props {
	formData: DefaultEmployee
	errors: EmployeeErrors
	required: EmployeeRequired
	disabled: EmployeeDisabled
	mode: FormMode
	handleChange: (name: Action['type'], value: any) => void
	handleDepartment: ({
		value,
		centroCostoId
	}: {
		value: string
		centroCostoId: string
	}) => Promise<void>
}

export const EmployeeInputs = memo(function ({
	errors,
	required,
	disabled,
	formData,
	mode,
	handleChange,
	handleDepartment
}: Props) {
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
							selectInput={
								<select
									value={formData.nationality ?? ''}
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
										handleChange('nationality', e.target.value)
									}
									className="leftIcon focus:outline-none appearance-none"
									disabled={disabled.nationality}
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
					<DepartamentoCombobox
						value={formData.departamentoId ?? ''}
						handleFormChange={handleDepartment}
						name="departamentoId"
						method="form"
						required={required.departamentoId}
						disabled={disabled.departamentoId}
					/>
					<CentroTrabajoCombobox
						value={formData.centroTrabajoId ?? ''}
						handleChange={(_name, value) => handleChange('centroTrabajoId', value)}
						name="centroTrabajoId"
						centroCostoId={formData.centroCostoId}
						required={required.centroTrabajoId}
						disabled={disabled.centroTrabajoId}
					/>
					<CargoCombobox
						value={formData.cargoId ?? ''}
						handleChange={(_name, value) => handleChange('cargoId', value)}
						name="cargoId"
						departamentoId={formData.departamentoId ?? ''}
						required={required.cargoId}
						disabled={disabled.cargoId}
					/>
					<Typography color="azul" variant="h6">
						Números de teléfono
					</Typography>
					<PhoneSection handleChange={handleChange} value={formData.phone} />
					<Typography color="azul" variant="h6">
						Extensión
					</Typography>
					<ExtensionSection handleChange={handleChange} value={formData.extension} />
				</div>
			</div>
		</div>
	)
})
