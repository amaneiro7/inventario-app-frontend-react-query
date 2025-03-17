import { type EmployeeDto } from '../../domain/dto/Employee.dto'
import { EmployeeCedula } from '../../domain/value-object/EmployeeCedula'
import { EmployeeCode } from '../../domain/value-object/EmployeeCode'
import { EmployeeEmail } from '../../domain/value-object/EmployeeEmail'
import { EmployeeLastName } from '../../domain/value-object/EmployeeLastName'
import { EmployeeName } from '../../domain/value-object/EmployeeName'
import { Nationalities } from '../../domain/value-object/EmployeeNationality'
import { EmployeeTypes } from '../../domain/value-object/EmployeeType'
import { EmployeeUserName } from '../../domain/value-object/EmployeUsername'

export interface DefaultEmployee {
	id?: EmployeeDto['id']
	userName: EmployeeDto['userName']
	type: EmployeeDto['type']
	name: EmployeeDto['name']
	lastName: EmployeeDto['lastName']
	email: EmployeeDto['email']
	isStillWorking: EmployeeDto['isStillWorking']
	employeeCode: EmployeeDto['employeeCode'] | ''
	nationality: EmployeeDto['nationality'] | ''
	cedula: EmployeeDto['cedula'] | ''
	locationId: EmployeeDto['locationId']
	departamentoId: EmployeeDto['departamentoId']
	centroCostoId: EmployeeDto['centoTrabajo']['centroCostoId']
	centroTrabajoId: EmployeeDto['centroTrabajoId']
	cargoId: EmployeeDto['cargoId']
	extension: EmployeeDto['extension']
	phone: EmployeeDto['phone']
	devices: EmployeeDto['devices']
	updatedAt?: EmployeeDto['updatedAt']
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
	centroCostoId: boolean
	centroTrabajoId: boolean
	locationId: boolean
	departamentoId: boolean
	cargoId: boolean
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
	centroCostoId: boolean
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
		employeeCode: '',
		nationality: '',
		cedula: '',
		locationId: '',
		departamentoId: '',
		centroCostoId: '',
		centroTrabajoId: '',
		cargoId: '',
		extension: [],
		phone: [],
		devices: [],
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
		email: false,
		employeeCode: true,
		nationality: true,
		cedula: true,
		centroCostoId: true,
		centroTrabajoId: true,
		locationId: false,
		departamentoId: true,
		cargoId: true
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
		centroCostoId: false,
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
	| {
			type: 'departamentoId'
			payload: {
				value: DefaultEmployee['departamentoId']
				centroCostoId: DefaultEmployee['centroCostoId']
			}
	  }
	| { type: 'centroTrabajoId'; payload: { value: DefaultEmployee['centroTrabajoId'] } }
	| { type: 'cargoId'; payload: { value: DefaultEmployee['cargoId'] } }
	| { type: 'extension'; payload: { value: DefaultEmployee['extension'] } }
	| { type: 'phone'; payload: { value: DefaultEmployee['phone'] } }

export const employeeFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			const { type } = action.payload.formData
			return {
				...state,
				formData: {
					...action.payload.formData,
					type,
					employeeCode:
						type === EmployeeTypes.GENERIC || !type
							? ''
							: action.payload.formData.employeeCode ?? 1,
					nationality:
						type === EmployeeTypes.GENERIC || !type
							? ''
							: action.payload.formData.nationality ?? Nationalities.V
				},
				disabled: {
					...state.disabled,
					name: !type || type === EmployeeTypes.GENERIC,
					lastName: !type || type === EmployeeTypes.GENERIC,
					email: !type || type === EmployeeTypes.GENERIC,
					employeeCode: !type || type === EmployeeTypes.GENERIC,
					nationality: !type || type === EmployeeTypes.GENERIC,
					cedula: !type || type === EmployeeTypes.GENERIC,
					locationId: !type || type === EmployeeTypes.GENERIC,
					centroTrabajoId: !type || type === EmployeeTypes.GENERIC,
					departamentoId: !type || type === EmployeeTypes.GENERIC,
					cargoId: !type || type === EmployeeTypes.GENERIC
				},
				required: {
					...state.required,
					name: type !== EmployeeTypes.GENERIC,
					lastName: type !== EmployeeTypes.GENERIC,
					employeeCode: type !== EmployeeTypes.GENERIC,
					nationality: type !== EmployeeTypes.GENERIC,
					cedula: type !== EmployeeTypes.GENERIC,
					centroTrabajoId: type !== EmployeeTypes.GENERIC,
					departamentoId: type !== EmployeeTypes.GENERIC,
					cargoId: type !== EmployeeTypes.GENERIC
				}
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
				formData: {
					...state.formData,
					type,
					name: '',
					lastName: '',
					email: '',
					employeeCode: type === EmployeeTypes.GENERIC || !type ? '' : 1,
					nationality: type === EmployeeTypes.GENERIC || !type ? '' : Nationalities.V,
					cedula: '',
					locationId: '',
					centroTrabajoId: '',
					departamentoId: '',
					cargoId: '',
					extension: [],
					phone: []
				},
				disabled: {
					...state.disabled,
					name: !type || type === EmployeeTypes.GENERIC,
					lastName: !type || type === EmployeeTypes.GENERIC,
					email: !type || type === EmployeeTypes.GENERIC,
					employeeCode: !type || type === EmployeeTypes.GENERIC,
					nationality: !type || type === EmployeeTypes.GENERIC,
					cedula: !type || type === EmployeeTypes.GENERIC,
					locationId: !type || type === EmployeeTypes.GENERIC,
					centroTrabajoId: !type || type === EmployeeTypes.GENERIC,
					departamentoId: !type || type === EmployeeTypes.GENERIC,
					cargoId: !type || type === EmployeeTypes.GENERIC
				},
				required: {
					...state.required,
					name: type !== EmployeeTypes.GENERIC,
					lastName: type !== EmployeeTypes.GENERIC,
					email: type !== EmployeeTypes.GENERIC,
					employeeCode: type !== EmployeeTypes.GENERIC,
					nationality: type !== EmployeeTypes.GENERIC,
					cedula: type !== EmployeeTypes.GENERIC,
					centroTrabajoId: type !== EmployeeTypes.GENERIC,
					departamentoId: type !== EmployeeTypes.GENERIC,
					cargoId: type !== EmployeeTypes.GENERIC
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
		case 'email': {
			const email = action.payload.value
			return {
				...state,
				formData: { ...state.formData, email },
				errors: {
					...state.errors,
					email: EmployeeEmail.isValid({
						value: email,
						type: state.formData.type
					})
						? ''
						: EmployeeEmail.invalidMessage()
				}
			}
		}
		case 'isStillWorking': {
			const isStillWorking = action.payload.value
			return {
				...state,
				formData: { ...state.formData, isStillWorking }
			}
		}
		case 'employeeCode': {
			const { value } = action.payload
			const employeeCode = value ? Number(value) : ''
			return {
				...state,
				formData: { ...state.formData, employeeCode },
				errors: {
					...state.errors,
					employeeCode: EmployeeCode.isValid({
						value: employeeCode,
						type: state.formData.type
					})
						? ''
						: EmployeeCode.invalidMessage()
				}
			}
		}
		case 'nationality': {
			const nationality = action.payload.value
			return {
				...state,
				formData: { ...state.formData, nationality }
			}
		}
		case 'cedula': {
			const { value } = action.payload
			const cedula = value ? Number(value) : ''
			return {
				...state,
				formData: { ...state.formData, cedula },
				errors: {
					...state.errors,
					cedula: EmployeeCedula.isValid({
						value: cedula,
						type: state.formData.type
					})
						? ''
						: EmployeeCedula.invalidMessage()
				}
			}
		}
		case 'locationId': {
			const locationId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, locationId }
			}
		}
		case 'departamentoId': {
			const { value: departamentoId, centroCostoId } = action.payload

			return {
				...state,
				formData: { ...state.formData, departamentoId, centroCostoId },
				disabled: {
					...state.disabled,
					centroTrabajoId: !centroCostoId
				}
			}
		}
		case 'centroTrabajoId': {
			const centroTrabajoId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, centroTrabajoId },
				disabled: {
					...state.disabled,
					cargoId: !centroTrabajoId
				}
			}
		}
		case 'cargoId': {
			const cargoId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, cargoId }
			}
		}
		case 'extension': {
			const extension = action.payload.value
			return {
				...state,
				formData: { ...state.formData, extension }
			}
		}
		case 'phone': {
			const phone = action.payload.value
			return {
				...state,
				formData: { ...state.formData, phone }
			}
		}

		default:
			return state
	}
}
