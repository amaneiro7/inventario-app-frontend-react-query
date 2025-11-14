import { type EmployeeDto } from '../../domain/dto/Employee.dto'
import { EmployeeCedula } from '../../domain/value-object/EmployeeCedula'
import { EmployeeCode } from '../../domain/value-object/EmployeeCode'
import { EmployeeEmail } from '../../domain/value-object/EmployeeEmail'
import { EmployeeLastName } from '../../domain/value-object/EmployeeLastName'
import { EmployeeName } from '../../domain/value-object/EmployeeName'
import { Nationalities } from '../../domain/value-object/EmployeeNationality'
import { EmployeeTypes } from '../../domain/value-object/EmployeeType'
import { EmployeeUserName } from '../../domain/value-object/EmployeeUsername'

/**
 * Represents the default structure for an employee's form data.
 */
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
	directivaId: EmployeeDto['directivaId']
	vicepresidenciaEjecutivaId: EmployeeDto['vicepresidenciaEjecutivaId']
	vicepresidenciaId: EmployeeDto['vicepresidenciaId']
	departamentoId: EmployeeDto['departamentoId']
	cargoId: EmployeeDto['cargoId']
	extension: EmployeeDto['extension']
	extensionSegments: { operadora: string; numero: string }[]
	phone: EmployeeDto['phone']
	phoneSegments: { operadora: string; numero: string }[]
	devices: EmployeeDto['devices']
	updatedAt?: EmployeeDto['updatedAt']
	allowedDomians?: string[]
}

/**
 * Defines the structure for validation errors in the employee form.
 */
export interface EmployeeErrors {
	userName: string
	type: string
	name: string
	lastName: string
	email: string
	employeeCode: string
	nationality: string
	directivaId: string
	vicepresidenciaEjecutivaId: string
	vicepresidenciaId: string
	cedula: string
}

/**
 * Defines which fields in the employee form are required based on current state.
 */
export interface EmployeeRequired {
	userName: boolean
	type: boolean
	name: boolean
	lastName: boolean
	email: boolean
	employeeCode: boolean
	nationality: boolean
	cedula: boolean
	locationId: boolean
	departamentoId: boolean
	directivaId: boolean
	vicepresidenciaEjecutivaId: boolean
	vicepresidenciaId: boolean
	cargoId: boolean
}

/**
 * Defines which fields in the employee form are disabled based on current state.
 */
export interface EmployeeDisabled {
	userName: boolean
	type: boolean
	name: boolean
	lastName: boolean
	email: boolean
	employeeCode: boolean
	nationality: boolean
	cedula: boolean
	locationId: boolean
	departamentoId: boolean
	directivaId: boolean
	vicepresidenciaEjecutivaId: boolean
	vicepresidenciaId: boolean
	cargoId: boolean
}

/**
 * Represents the entire state managed by the employee form reducer.
 */
export interface State {
	formData: DefaultEmployee
	errors: EmployeeErrors
	required: EmployeeRequired
	disabled: EmployeeDisabled
}

/**
 * The initial state for the employee form reducer.
 */
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
		directivaId: '',
		vicepresidenciaEjecutivaId: '',
		vicepresidenciaId: '',
		departamentoId: '',
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
		cedula: '',
		directivaId: '',
		vicepresidenciaEjecutivaId: '',
		vicepresidenciaId: ''
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
		locationId: false,
		directivaId: false,
		vicepresidenciaEjecutivaId: false,
		vicepresidenciaId: false,
		departamentoId: false,
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
		locationId: false,
		departamentoId: false,
		directivaId: false,
		vicepresidenciaEjecutivaId: false,
		vicepresidenciaId: false,
		cargoId: false
	}
}

/**
 * Defines the possible actions that can be dispatched to the employee form reducer.
 */
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
	| { type: 'directivaId'; payload: { value: DefaultEmployee['directivaId'] } }
	| {
			type: 'vicepresidenciaEjecutivaId'
			payload: { value: DefaultEmployee['vicepresidenciaEjecutivaId'] }
	  }
	| { type: 'vicepresidenciaId'; payload: { value: DefaultEmployee['vicepresidenciaId'] } }
	| { type: 'departamentoId'; payload: { value: DefaultEmployee['departamentoId'] } }
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

/**
 * Reducer function for managing the state of the employee form.
 * It handles various actions to update form data, errors, required fields, and disabled fields.
 * @param state - The current state of the form.
 * @param action - The dispatched action.
 * @returns The new state after applying the action.
 */
export const employeeFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		/**
		 * Initializes or resets the form data. Adjusts employeeCode and nationality based on employee type.
		 * Also sets disabled and required fields based on the form data.
		 */
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
							: (action.payload.formData.employeeCode ?? 1),
					nationality:
						type === EmployeeTypes.GENERIC || !type
							? ''
							: action.payload.formData.nationality || Nationalities.V,
					phone: phone.length > 0 ? phone : [''],
					extension: extension.length > 0 ? extension : [''],
					phoneSegments:
						phone.length > 0
							? phone.map(phone => {
									const match = phone.match(/(\d{4})(\d{7})/)
									const operadora = match ? match?.[1] : ''
									const numero = match ? match?.[2] : ''
									return { operadora, numero }
								})
							: [{ numero: '', operadora: '' }],
					extensionSegments:
						extension.length > 0
							? extension.map(phone => {
									const match = phone.match(/(\d{4})(\d{7})/)
									const operadora = match ? match?.[1] : ''
									const numero = match ? match?.[2] : ''
									return { operadora, numero }
								})
							: [{ numero: '', operadora: '' }]
				},
				disabled: {
					...state.disabled,
					employeeCode: !type || type === EmployeeTypes.GENERIC,
					nationality: !type || type === EmployeeTypes.GENERIC,
					cedula: !type || type === EmployeeTypes.GENERIC,
					locationId: !type || type === EmployeeTypes.GENERIC,
					vicepresidenciaEjecutivaId: !action.payload.formData.directivaId,
					vicepresidenciaId:
						!action.payload.formData.directivaId ||
						!action.payload.formData.vicepresidenciaEjecutivaId,
					departamentoId:
						!action.payload.formData.directivaId ||
						!action.payload.formData.vicepresidenciaEjecutivaId ||
						!action.payload.formData.vicepresidenciaId,
					cargoId: !type || type === EmployeeTypes.GENERIC
				},
				required: {
					...state.required,
					name: type !== EmployeeTypes.GENERIC,
					lastName: type !== EmployeeTypes.GENERIC,
					employeeCode: type !== EmployeeTypes.GENERIC,
					nationality: type !== EmployeeTypes.GENERIC,
					cedula: type !== EmployeeTypes.GENERIC,
					directivaId: type !== EmployeeTypes.GENERIC,
					cargoId: type !== EmployeeTypes.GENERIC
				}
			}
		}

		/**
		 * Updates the userName field and validates it.
		 */
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

		/**
		 * Updates the employee type and resets related fields (name, lastName, email, etc.)
		 * and their required/disabled states based on the new type.
		 */
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
					directivaId: '',
					vicepresidenciaEjecutivaId: '',
					vicepresidenciaId: '',
					departamentoId: '',
					cargoId: '',
					extension: [],
					phone: []
				},
				disabled: {
					...state.disabled,
					name: !type,
					lastName: !type,
					email: !type,
					employeeCode: !type || type === EmployeeTypes.GENERIC,
					nationality: !type || type === EmployeeTypes.GENERIC,
					cedula: !type || type === EmployeeTypes.GENERIC,
					locationId: !type || type === EmployeeTypes.GENERIC,
					directivaId: !type,
					vicepresidenciaEjecutivaId: !type,
					vicepresidenciaId: !type,
					departamentoId: !type,
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
					directivaId: type !== EmployeeTypes.GENERIC,
					vicepresidenciaEjecutivaId: type !== EmployeeTypes.GENERIC,
					vicepresidenciaId: type !== EmployeeTypes.GENERIC,
					departamentoId: type !== EmployeeTypes.GENERIC,
					cargoId: type !== EmployeeTypes.GENERIC
				}
			}
		}

		/**
		 * Updates the name field and validates it.
		 */
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

		/**
		 * Updates the lastName field and validates it.
		 */
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

		/**
		 * Updates the email field and validates it.
		 */
		case 'email': {
			const email = action.payload.value
			return {
				...state,
				formData: { ...state.formData, email },
				errors: {
					...state.errors,
					email: EmployeeEmail.isValid({
						value: email,
						allowedDomains: state.formData.allowedDomians ?? []
					})
						? ''
						: EmployeeEmail.invalidMessage()
				}
			}
		}

		/**
		 * Updates the isStillWorking field.
		 */
		case 'isStillWorking': {
			const isStillWorking = action.payload.value
			return {
				...state,
				formData: { ...state.formData, isStillWorking }
			}
		}

		/**
		 * Updates the employeeCode field and validates it.
		 */
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

		/**
		 * Updates the nationality field.
		 */
		case 'nationality': {
			const nationality = action.payload.value
			return {
				...state,
				formData: { ...state.formData, nationality }
			}
		}

		/**
		 * Updates the cedula field and validates it.
		 */
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

		/**
		 * Updates the locationId field.
		 */
		case 'locationId': {
			const locationId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, locationId }
			}
		}

		/**
		 * Updates the directivaId field and resets related fields (vicepresidenciaEjecutivaId, vicepresidenciaId, departamentoId, cargoId).
		 * Also updates disabled states for dependent fields.
		 */
		case 'directivaId': {
			const { value: directivaId } = action.payload

			return {
				...state,
				formData: {
					...state.formData,
					directivaId,
					vicepresidenciaEjecutivaId: '',
					vicepresidenciaId: '',
					departamentoId: '',
					cargoId: ''
				},
				disabled: {
					...state.disabled,
					vicepresidenciaEjecutivaId: !directivaId,
					vicepresidenciaId: true,
					departamentoId: true
				}
			}
		}

		/**
		 * Updates the vicepresidenciaEjecutivaId field and resets related fields (vicepresidenciaId, departamentoId, cargoId).
		 * Also updates disabled states for dependent fields.
		 */
		case 'vicepresidenciaEjecutivaId': {
			const { value: vicepresidenciaEjecutivaId } = action.payload

			return {
				...state,
				formData: {
					...state.formData,
					vicepresidenciaEjecutivaId,
					vicepresidenciaId: '',
					departamentoId: '',
					cargoId: ''
				},
				disabled: {
					...state.disabled,
					vicepresidenciaId: !vicepresidenciaEjecutivaId,
					departamentoId: true
				}
			}
		}

		/**
		 * Updates the vicepresidenciaId field and resets related fields (departamentoId, cargoId).
		 * Also updates disabled states for dependent fields.
		 */
		case 'vicepresidenciaId': {
			const { value: vicepresidenciaId } = action.payload

			return {
				...state,
				formData: { ...state.formData, vicepresidenciaId, departamentoId: '', cargoId: '' },
				disabled: {
					...state.disabled,
					departamentoId: !vicepresidenciaId
				}
			}
		}

		/**
		 * Updates the departamentoId field and resets the cargoId field.
		 */
		case 'departamentoId': {
			const { value: departamentoId } = action.payload

			return {
				...state,
				formData: { ...state.formData, departamentoId, cargoId: '' }
			}
		}

		/**
		 * Updates the cargoId field.
		 */
		case 'cargoId': {
			const cargoId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, cargoId }
			}
		}

		/**
		 * Adds a new empty phone entry to the form data.
		 */
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

		/**
		 * Adds a new empty extension entry to the form data.
		 */
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

		/**
		 * Removes a phone entry at a specific index from the form data.
		 */
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

		/**
		 * Removes an extension entry at a specific index from the form data.
		 */
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

		/**
		 * Clears the phone number and its segments at a specific index.
		 */
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

		/**
		 * Clears the extension number and its segments at a specific index.
		 */
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

		/**
		 * Updates the numeric part of an extension at a specific index.
		 */
		case 'extensionNumero': {
			const { index, value } = action.payload

			const extension = [...state.formData.extension]
			const extensionSegments = [...state.formData.extensionSegments]
			const maxLength = 7 // Define the character limit
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

		/**
		 * Updates the area code (operadora) of an extension at a specific index.
		 */
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

		/**
		 * Updates the numeric part of a phone number at a specific index.
		 */
		case 'phoneNumero': {
			const { index, value } = action.payload

			const phone = [...state.formData.phone]
			const phoneSegments = [...state.formData.phoneSegments]
			const maxLength = 7 // Define the character limit
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

		/**
		 * Updates the area code (operadora) of a phone number at a specific index.
		 */
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
