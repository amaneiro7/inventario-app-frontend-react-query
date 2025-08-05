import { memo, useMemo } from 'react'
import { Checkbox } from '@/shared/ui/Checkbox'
import { EmployeeTypeCombobox } from '@/entities/employee/employee/infra/ui/EmployeeTypeComboBox'
import { Input } from '@/shared/ui/Input/Input'
import Typography from '@/shared/ui/Typography'
import { Nationalities } from '@/entities/employee/employee/domain/value-object/EmployeeNationality'
import {
	type EmployeeDisabled,
	type EmployeeErrors,
	type EmployeeRequired,
	type Action,
	type DefaultEmployee
} from '@/entities/employee/employee/infra/reducers/employeeFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { EmployeeCedula } from '@/entities/employee/employee/domain/value-object/EmployeeCedula'

interface MainEmployeeInfoProps {
	/**
	 * The username of the employee.
	 */
	userName: DefaultEmployee['userName']
	/**
	 * The type of the employee.
	 */
	type: DefaultEmployee['type']
	/**
	 * Indicates if the employee is still working.
	 */
	isStillWorking: DefaultEmployee['isStillWorking']
	/**
	 * The first name of the employee.
	 */
	name: DefaultEmployee['name']
	/**
	 * The last name of the employee.
	 */
	lastName: DefaultEmployee['lastName']
	/**
	 * The email of the employee.
	 */
	email: DefaultEmployee['email']
	/**
	 * The employee code.
	 */
	employeeCode: DefaultEmployee['employeeCode']
	/**
	 * The national identification number (cedula) of the employee.
	 */
	cedula: DefaultEmployee['cedula']
	/**
	 * The nationality of the employee.
	 */
	nationality: DefaultEmployee['nationality']
	/**
	 * The current mode of the form (e.g., 'add' or 'edit').
	 */
	mode: FormMode
	/**
	 * Indicates if the userName field is required.
	 */
	userNameRequired: EmployeeRequired['userName']
	/**
	 * Indicates if the type field is required.
	 */
	typeRequired: EmployeeRequired['type']
	/**
	 * Indicates if the name field is required.
	 */
	nameRequired: EmployeeRequired['name']
	/**
	 * Indicates if the lastName field is required.
	 */
	lastNameRequired: EmployeeRequired['lastName']
	/**
	 * Indicates if the email field is required.
	 */
	emailRequired: EmployeeRequired['email']
	/**
	 * Indicates if the employeeCode field is required.
	 */
	employeeCodeRequired: EmployeeRequired['employeeCode']
	/**
	 * Indicates if the cedula field is required.
	 */
	cedulaRequired: EmployeeRequired['cedula']
	/**
	 * Indicates if the userName field is disabled.
	 */
	userNameDisabled: EmployeeDisabled['userName']
	/**
	 * Indicates if the type field is disabled.
	 */
	typeDisabled: EmployeeDisabled['type']
	/**
	 * Indicates if the name field is disabled.
	 */
	nameDisabled: EmployeeDisabled['name']
	/**
	 * Indicates if the lastName field is disabled.
	 */
	lastNameDisabled: EmployeeDisabled['lastName']
	/**
	 * Indicates if the email field is disabled.
	 */
	emailDisabled: EmployeeDisabled['email']
	/**
	 * Indicates if the employeeCode field is disabled.
	 */
	employeeCodeDisabled: EmployeeDisabled['employeeCode']
	/**
	 * Indicates if the cedula field is disabled.
	 */
	cedulaDisabled: EmployeeDisabled['cedula']
	/**
	 * Indicates if the nationality field is disabled.
	 */
	nationalityDisabled: EmployeeDisabled['nationality']
	/**
	 * Error message for the userName field.
	 */
	userNameError: EmployeeErrors['userName']
	/**
	 * Error message for the name field.
	 */
	nameError: EmployeeErrors['name']
	/**
	 * Error message for the lastName field.
	 */
	lastNameError: EmployeeErrors['lastName']
	/**
	 * Error message for the email field.
	 */
	emailError: EmployeeErrors['email']
	/**
	 * Error message for the employeeCode field.
	 */
	employeeCodeError: EmployeeErrors['employeeCode']
	/**
	 * Error message for the cedula field.
	 */
	cedulaError: EmployeeErrors['cedula']
	/**
	 * Error message for the type field.
	 */
	typeError: EmployeeErrors['type']
	/**
	 * Callback function to handle changes in form input fields.
	 * @param name - The name of the field being changed.
	 * @param value - The new value of the field.
	 */
	handleChange: (name: Action['type'], value: any) => void
}

/**
 * `MainEmployeeInfo` is a memoized functional component that renders the main input fields
 * for employee information, including username, type, employment status, name, last name, email,
 * employee code, and national identification number (cedula) with nationality selection.
 */
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
		}, [])
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