import { memo, useMemo } from 'react'
import { Checkbox } from '@/components/Checkbox/Checbox'
import { EmployeeTypeCombobox } from '@/components/ComboBox/Sincrono/EmployeeTypeComboBox'
import { Input } from '@/components/Input/Input'
import Typography from '@/components/Typography'
import { Nationalities } from '@/core/employee/employee/domain/value-object/EmployeeNationality'
import {
	type EmployeeDisabled,
	type EmployeeErrors,
	type EmployeeRequired,
	type Action,
	type DefaultEmployee
} from '@/core/employee/employee/infra/reducers/employeeFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'
import { EmployeeCedula } from '@/core/employee/employee/domain/value-object/EmployeeCedula'

interface MainEmployeeInfoProps {
	userName: DefaultEmployee['userName']
	type: DefaultEmployee['type']
	isStillWorking: DefaultEmployee['isStillWorking']
	name: DefaultEmployee['name']
	lastName: DefaultEmployee['lastName']
	email: DefaultEmployee['email']
	employeeCode: DefaultEmployee['employeeCode']
	cedula: DefaultEmployee['cedula']
	nationality: DefaultEmployee['nationality']
	mode: FormMode
	userNameRequired: EmployeeRequired['userName']
	typeRequired: EmployeeRequired['type']
	nameRequired: EmployeeRequired['name']
	lastNameRequired: EmployeeRequired['lastName']
	emailRequired: EmployeeRequired['email']
	employeeCodeRequired: EmployeeRequired['employeeCode']
	cedulaRequired: EmployeeRequired['cedula']
	userNameDisabled: EmployeeDisabled['userName']
	typeDisabled: EmployeeDisabled['type']
	nameDisabled: EmployeeDisabled['name']
	lastNameDisabled: EmployeeDisabled['lastName']
	emailDisabled: EmployeeDisabled['email']
	employeeCodeDisabled: EmployeeDisabled['employeeCode']
	cedulaDisabled: EmployeeDisabled['cedula']
	nationalityDisabled: EmployeeDisabled['nationality']
	userNameError: EmployeeErrors['userName']
	nameError: EmployeeErrors['name']
	lastNameError: EmployeeErrors['lastName']
	emailError: EmployeeErrors['email']
	employeeCodeError: EmployeeErrors['employeeCode']
	cedulaError: EmployeeErrors['cedula']
	typeError: EmployeeErrors['type']
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleChange: (name: Action['type'], value: any) => void
}

export const MainEmployeeInfo = memo(
	({
		userName,
		type,
		isStillWorking,
		name,
		lastName,
		email,
		employeeCode,
		cedula,
		nationality,
		mode,
		userNameRequired,
		typeRequired,
		nameRequired,
		lastNameRequired,
		emailRequired,
		employeeCodeRequired,
		cedulaRequired,
		userNameDisabled,
		typeDisabled,
		nameDisabled,
		lastNameDisabled,
		emailDisabled,
		employeeCodeDisabled,
		nationalityDisabled,
		cedulaDisabled,
		userNameError,
		nameError,
		lastNameError,
		emailError,
		employeeCodeError,
		cedulaError,
		typeError,
		handleChange
	}: MainEmployeeInfoProps) => {
		const nacionalities = useMemo(() => {
			return Object.values(Nationalities).flatMap(opt => ({ id: opt }))
		}, [Nationalities])
		return (
			<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
				<Typography color="azul" variant="h5">
					Información principal del usuario
				</Typography>
				<Input
					id="employee-userName"
					value={userName ?? ''}
					name="userName"
					label="Usuario"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('userName', e.target.value)
					}
					readOnly={mode === 'edit'}
					error={!!userNameError}
					errorMessage={userNameError}
					required={userNameRequired}
					disabled={userNameDisabled}
				/>
				<EmployeeTypeCombobox
					value={type}
					handleChange={(_name, value) => handleChange('type', value)}
					name="type"
					required={typeRequired}
					disabled={typeDisabled}
					error={typeError}
					readonly={mode === 'edit'}
				/>
				<Checkbox
					value={isStillWorking}
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
				<div className="gap-4 md:flex md:flex-row">
					<Input
						id="employee-name"
						value={name ?? ''}
						name="name"
						label="Nombres"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('name', e.target.value)
						}
						error={!!nameError}
						errorMessage={nameError}
						required={nameRequired}
						disabled={nameDisabled}
					/>
					<Input
						id="employee-lastName"
						value={lastName ?? ''}
						name="lastName"
						label="Apellidos"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('lastName', e.target.value)
						}
						error={!!lastNameError}
						errorMessage={lastNameError}
						required={lastNameRequired}
						disabled={lastNameDisabled}
					/>
				</div>
				<Input
					id="employee-email"
					value={email ?? ''}
					name="email"
					label="Correo electrónico"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('email', e.target.value)
					}
					error={!!emailError}
					errorMessage={emailError}
					required={emailRequired}
					disabled={emailDisabled}
				/>
				<div className="gap-4 md:grid md:grid-cols-2">
					<Input
						id="employeeCode"
						value={employeeCode ?? ''}
						name="employeeCode"
						label="Código de empleado"
						type="number"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('employeeCode', e.target.value)
						}
						min={1}
						readOnly={mode === 'edit'}
						error={!!employeeCodeError}
						errorMessage={employeeCodeError}
						required={employeeCodeRequired}
						disabled={employeeCodeDisabled}
					/>

					<Input
						id="cedula"
						value={cedula ?? ''}
						name="cedula"
						label="Cédula de Identidad"
						type="number"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('cedula', e.target.value)
						}
						error={!!cedulaError}
						errorMessage={cedulaError}
						required={cedulaRequired}
						disabled={cedulaDisabled}
						min={EmployeeCedula.MIN}
						max={EmployeeCedula.MAX}
						readOnly={mode === 'edit'}
						selectInput={
							<select
								value={nationality ?? ''}
								onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
									handleChange('nationality', e.target.value)
								}
								className="leftIcon appearance-none focus:outline-hidden"
								disabled={nationalityDisabled || mode === 'edit'}
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
		)
	}
)

MainEmployeeInfo.displayName = 'MainEmployeeInfo'
