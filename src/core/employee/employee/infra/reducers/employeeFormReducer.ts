import { type EmployeeDto, type EmployeeParams } from '../../domain/dto/Employee.dto'
import { EmployeeLastName } from '../../domain/value-object/EmployeeLastName'
import { EmployeeName } from '../../domain/value-object/EmployeeName'
import { Nationalities } from '../../domain/value-object/EmployeeNationality'
import { EmployeeType, EmployeeTypes } from '../../domain/value-object/EmployeeType'
import { EmployeeUserName } from '../../domain/value-object/EmployeUsername'

export type DefaultEmployee = {
	type: 
	name: string
	lastName: string
	email: string
	employeeCode: string
	nationality: string
	cedula: string
	centroTrabajoId: string
	locationId: string
	departamentoId: string
	cargoId: string
	extension: string
	phone: string	
	updatedAt?: string
}

export interface EmployeeErrors {
	userName: string
	type: string
	name: string
	lastName: string
	email: string
	employeeCode: string
	nationality: string
	cedula: string
}
export interface EmployeeRequired {
	userName: boolean
	type: boolean
	name: boolean
	lastName: boolean
	email: boolean
	employeeCode: boolean
	nationality: boolean
	cedula: boolean
}
export interface EmployeeDisabled {
	userName: boolean
	type: boolean
	name: boolean
	lastName: boolean
	email: boolean
	employeeCode: boolean
	nationality: boolean
	cedula: boolean
	centroTrabajoId: boolean
	locationId: boolean
	departamentoId: boolean
	cargoId: boolean
}

export interface State {
	formData: DefaultEmployee
	errors: EmployeeErrors
	required: EmployeeRequired
	disabled: EmployeeDisabled
}

export const initialEmployeeState: State = {
	formData: {
		id: '',
		userName: '',
		type: EmployeeTypes.REGULAR,
		name: '',
		lastName: '',
		email: '',
		isStillWorking: true,
		employeeCode: 0,
		nationality: Nationalities.V,
		cedula: 0,
		locationId: '',
		departamentoId: '',
		centroTrabajoId: '',
		cargoId: '',
		extension: [],
		phone: [],
		updatedAt: undefined
	},
	errors: {
		userName: '',
		type: '',
		name: '',
		lastName: '',
		email: '',
		employeeCode: '',
		nationality: '',
		cedula: ''
	},
	required: {
		userName: true,
		type: true,
		name: true,
		lastName: true,
		email: true,
		employeeCode: true,
		nationality: true,
		cedula: true
	},
	disabled: {
		userName: false,
		type: false,
		name: false,
		lastName: false,
		email: false,
		employeeCode: false,
		nationality: false,
		cedula: false,
		centroTrabajoId: false,
		locationId: false,
		departamentoId: false,
		cargoId: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultEmployee } }
	| { type: 'reset'; payload: { formData: DefaultEmployee } }
	| { type: 'userName'; payload: { value: DefaultEmployee['userName'] } }
	| { type: 'type'; payload: { value: DefaultEmployee['type'] } }
	| { type: 'name'; payload: { value: DefaultEmployee['name'] } }
	| { type: 'lastName'; payload: { value: DefaultEmployee['lastName'] } }
	| { type: 'email'; payload: { value: DefaultEmployee['email'] } }
	| { type: 'isStillWorking'; payload: { value: DefaultEmployee['isStillWorking'] } }
	| { type: 'employeeCode'; payload: { value: DefaultEmployee['employeeCode'] } }
	| { type: 'nationality'; payload: { value: DefaultEmployee['nationality'] } }
	| { type: 'cedula'; payload: { value: DefaultEmployee['cedula'] } }
	| { type: 'locationId'; payload: { value: DefaultEmployee['locationId'] } }
	| { type: 'departamentoId'; payload: { value: DefaultEmployee['departamentoId'] } }
	| { type: 'centroTrabajoId'; payload: { value: DefaultEmployee['centroTrabajoId'] } }
	| { type: 'cargoId'; payload: { value: DefaultEmployee['cargoId'] } }
	| { type: 'addExtension'; payload: { value: string } }
	| { type: 'updateExtension'; payload: { value: string } }
	| { type: 'removeExtension'; payload: { value: string } }
	| { type: 'addPhone'; payload: { value: string } }
	| { type: 'updatePhone'; payload: { value: string } }
	| { type: 'removePhone'; payload: { value: string } }

export const employeeFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData }
			}
		}
		case 'userName': {
			const userName = action.payload.value
			return {
				...state,
				formData: { ...state.formData, userName },
				errors: {
					...state.errors,
					userName: EmployeeUserName.isValid(userName)
						? ''
						: EmployeeUserName.invalidMessage()
				}
			}
		}
		case 'type': {
			const type = action.payload.value
			return {
				...state,
				formData: { ...state.formData, type, name: '', lastName: '', email: '',
					employeeCode: '', nationality: '', cedula: '' }
				 }
			}
		}
		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name },
				errors: {
					...state.errors,
					name: EmployeeName.isValid({ value: name, type: state.formData.type })
						? ''
						: EmployeeName.invalidMessage()
				}
			}
		}
		case 'lastName': {
			const lastName = action.payload.value
			return {
				...state,
				formData: { ...state.formData, lastName },
				errors: {
					...state.errors,
					lastName: EmployeeLastName.isValid({
						value: lastName,
						type: state.formData.type
					})
						? ''
						: EmployeeLastName.invalidMessage()
				}
			}
		}
		default:
			return state
	}
}
