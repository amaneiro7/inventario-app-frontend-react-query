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
	extensionSegments: { operadora: string; numero: string }[]
	phone: EmployeeDto['phone']
	phoneSegments: { operadora: string; numero: string }[]
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
		extension: [''],
		extensionSegments: [{ numero: '', operadora: '' }],
		phone: [''],
		phoneSegments: [{ numero: '', operadora: '' }],
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
	| { type: 'addPhone' }
	| { type: 'addExtension' }
	| { type: 'removePhone'; payload: { index: number } }
	| { type: 'removeExtension'; payload: { index: number } }
	| { type: 'clearPhone'; payload: { index: number } }
	| { type: 'clearExtension'; payload: { index: number } }
	| { type: 'phoneOperadora'; payload: { index: number; value: string } }
	| { type: 'extensionOperadora'; payload: { index: number; value: string } }
	| { type: 'phoneNumero'; payload: { index: number; value: string } }
	| { type: 'extensionNumero'; payload: { index: number; value: string } }

export const employeeFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			const { type, phone, extension } = action.payload.formData
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
							: action.payload.formData.nationality ?? Nationalities.V,
					phone: phone.length > 0 ? phone : [''],
					extension: extension.length > 0 ? extension : ['']
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
		case 'addPhone': {
			const phone = [...state.formData.phone]
			const phoneSegments = [...state.formData.phoneSegments]
			if (phone[phone.length - 1] !== '') {
				phone.push('')
				phoneSegments.push({
					numero: '',
					operadora: ''
				})
				return {
					...state,
					formData: { ...state.formData, phone, phoneSegments }
				}
			}
			return state
		}
		case 'addExtension': {
			const extension = [...state.formData.extension]
			const extensionSegments = [...state.formData.extensionSegments]
			if (extension[extension.length - 1] !== '') {
				extension.push('')
				extensionSegments.push({
					numero: '',
					operadora: ''
				})
				return {
					...state,
					formData: { ...state.formData, extension, extensionSegments }
				}
			}
			return state
		}
		case 'removePhone': {
			const index = action.payload.index
			const phone = [...state.formData.phone]
			const phoneSegments = [...state.formData.phoneSegments]
			if (phone.length > 1) {
				phone.splice(index, 1)
				phoneSegments.splice(index, 1)
				return {
					...state,
					formData: {
						...state.formData,
						phone,
						phoneSegments
					}
				}
			}
			return state
		}
		case 'removeExtension': {
			const index = action.payload.index
			const extension = [...state.formData.extension]
			const extensionSegments = [...state.formData.extensionSegments]
			if (extension.length > 1) {
				extension.splice(index, 1)
				extensionSegments.splice(index, 1)
				return {
					...state,
					formData: {
						...state.formData,
						extension,
						extensionSegments
					}
				}
			}
			return state
		}
		case 'clearPhone': {
			const index = action.payload.index
			const phone = [...state.formData.phone]
			const phoneSegments = [...state.formData.phoneSegments]

			phone[index] = ''
			phoneSegments[index] = {
				numero: '',
				operadora: ''
			}
			return {
				...state,
				formData: {
					...state.formData,
					phone,
					phoneSegments
				}
			}
		}
		case 'clearExtension': {
			const index = action.payload.index
			const extension = [...state.formData.extension]
			const extensionSegments = [...state.formData.extensionSegments]

			extension[index] = ''
			extensionSegments[index] = {
				numero: '',
				operadora: ''
			}
			return {
				...state,
				formData: {
					...state.formData,
					extension,
					extensionSegments
				}
			}
		}
		case 'extensionNumero': {
			const { index, value } = action.payload

			const extension = [...state.formData.extension]
			const extensionSegments = [...state.formData.extensionSegments]
			const maxLength = 7 // Define el límite de caracteres
			const trucatedValue = value.trim().slice(0, maxLength)

			extensionSegments[index] = {
				...extensionSegments[index],
				numero: trucatedValue
			}
			const combinedValue = `${extensionSegments[index].operadora}${trucatedValue}`
			extension[index] = combinedValue
			return {
				...state,
				formData: {
					...state.formData,
					extension,
					extensionSegments
				}
			}
		}
		case 'extensionOperadora': {
			const { index, value } = action.payload

			const extension = [...state.formData.extension]
			const extensionSegments = [...state.formData.extensionSegments]

			extensionSegments[index] = {
				...extensionSegments[index],
				operadora: value
			}
			const combinedValue = `${value}${extensionSegments[index].numero}`
			extension[index] = combinedValue
			return {
				...state,
				formData: {
					...state.formData,
					extension,
					extensionSegments
				}
			}
		}
		case 'phoneNumero': {
			const { index, value } = action.payload

			const phone = [...state.formData.phone]
			const phoneSegments = [...state.formData.phoneSegments]
			const maxLength = 7 // Define el límite de caracteres
			const trucatedValue = value.trim().slice(0, maxLength)

			phoneSegments[index] = {
				...phoneSegments[index],
				numero: trucatedValue
			}
			const combinedValue = `${phoneSegments[index].operadora}${trucatedValue}`
			phone[index] = combinedValue
			return {
				...state,
				formData: {
					...state.formData,
					phone,
					phoneSegments
				}
			}
		}
		case 'phoneOperadora': {
			const { index, value } = action.payload

			const phone = [...state.formData.phone]
			const phoneSegments = [...state.formData.phoneSegments]

			phoneSegments[index] = {
				...phoneSegments[index],
				operadora: value
			}
			const combinedValue = `${value}${phoneSegments[index].numero}`
			phone[index] = combinedValue
			return {
				...state,
				formData: {
					...state.formData,
					phone,
					phoneSegments
				}
			}
		}

		default:
			return state
	}
}
