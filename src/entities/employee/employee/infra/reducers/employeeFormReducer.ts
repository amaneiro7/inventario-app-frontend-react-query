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
	allowedDomains?: string[]
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
	| { type: 'allowedDomains'; payload: { value: string[] | undefined } }
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
			const { formData } = action.payload
			const { type, phone, extension } = formData
			const isGeneric = type === EmployeeTypes.GENERIC
			const isRegular = type === EmployeeTypes.REGULAR
			const isApprentice = type === EmployeeTypes.APPRENTICE
			const isContractor = type === EmployeeTypes.CONTRACTOR
			const isService = type === EmployeeTypes.SERVICE

			const hasNoHierarchy = isGeneric || isApprentice
			const hasEmployeeCode = isRegular || isService

			// Helper para parsear segmentos de teléfono/extensión
			const parseSegments = (list: string[]) =>
				list.length > 0
					? list.map(p => {
							const match = p.match(/(\d{4})(\d{7})/)
							return {
								operadora: match ? match[1] : '',
								numero: match ? match[2] : ''
							}
						})
					: [{ numero: '', operadora: '' }]

			return {
				...state,
				formData: {
					...formData,
					type,
					employeeCode:
						// Si es genérico, aprendiz, contratado o no hay un tipo seleccionado
						// el código de empleado se mantiene vacio, sino el valor que viene
						// en el initialState o 1 por defecto
						!hasEmployeeCode || !type ? '' : (formData.employeeCode ?? 1),
					nationality: isGeneric || !type ? '' : formData.nationality || Nationalities.V,
					phone: phone.length > 0 ? phone : [''],
					extension: extension.length > 0 ? extension : [''],
					phoneSegments: parseSegments(phone),
					extensionSegments: parseSegments(extension)
				},
				disabled: {
					...state.disabled,
					name: !type,
					lastName: !type,
					email: !type,
					employeeCode: !hasEmployeeCode || !type,
					nationality: !type || isGeneric,
					cedula: !type || isGeneric,
					locationId: !type || isGeneric,
					// Habilitación en cascada de la jerarquia
					directivaId: !type || hasNoHierarchy,
					vicepresidenciaEjecutivaId: !type || hasNoHierarchy || !formData.directivaId,
					vicepresidenciaId:
						!type || hasNoHierarchy || !formData.vicepresidenciaEjecutivaId,
					departamentoId: !type || hasNoHierarchy || !formData.vicepresidenciaId,
					cargoId: !type || hasNoHierarchy
				},
				required: {
					...state.required,
					name: !isGeneric,
					lastName: !isGeneric,
					employeeCode: isRegular,
					nationality: !isGeneric,
					cedula: !isGeneric,
					// Reglas organizacionales
					directivaId: isRegular || isContractor,
					cargoId: isRegular || isContractor,
					// Requeridos dinámicos por dependencia de jerarquía
					vicepresidenciaEjecutivaId: !hasNoHierarchy && !!formData.vicepresidenciaId,
					vicepresidenciaId: !hasNoHierarchy && !!formData.departamentoId,
					departamentoId: false
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

		case 'allowedDomains': {
			const allowedDomains = action.payload.value ?? []

			return {
				...state,
				formData: { ...state.formData, allowedDomains }
			}
		}

		/**
		 * Updates the employee type and resets related fields (name, lastName, email, etc.)
		 * and their required/disabled states based on the new type.
		 */
		case 'type': {
			const type = action.payload.value
			// 1. Predicados de Tipo (legibilidad)
			const isGeneric = type === EmployeeTypes.GENERIC
			const isRegular = type === EmployeeTypes.REGULAR
			const isApprentice = type === EmployeeTypes.APPRENTICE
			const isContractor = type === EmployeeTypes.CONTRACTOR

			// Tipos que NO manejan estructura organizacional (VP, Directiva, etc)
			const hasNoHierarchy = isGeneric || isApprentice
			// Tipos que si deberían tener código de empleado
			const hasEmployeeCode = isRegular

			return {
				...state,
				formData: {
					...state.formData,
					type,
					name: isGeneric ? '' : state.formData.name,
					lastName: isGeneric ? '' : state.formData.lastName,
					email: isApprentice ? '' : state.formData.email,
					employeeCode: !hasEmployeeCode ? '' : state.formData.employeeCode || 1,
					nationality: isGeneric ? '' : state.formData.nationality || Nationalities.V,
					cedula: isGeneric ? '' : state.formData.cedula,
					locationId: isGeneric ? '' : state.formData.locationId,
					directivaId: isGeneric || isApprentice ? '' : state.formData.directivaId,
					// Si es genérico o aprendiz, limpieamos toda la jerarquia
					vicepresidenciaEjecutivaId: hasNoHierarchy
						? ''
						: state.formData.vicepresidenciaEjecutivaId,
					vicepresidenciaId: hasNoHierarchy ? '' : state.formData.vicepresidenciaId,
					departamentoId: hasNoHierarchy ? '' : state.formData.departamentoId,
					cargoId: hasNoHierarchy ? '' : state.formData.cargoId,
					extension: [],
					phone: []
				},
				disabled: {
					...state.disabled,
					name: !type,
					lastName: !type,
					email: !type,
					employeeCode: !hasEmployeeCode || !type,
					nationality: !type || isGeneric,
					cedula: !type || isGeneric,
					locationId: !type || isGeneric,
					// Jerarquía: Se habilitan en cadena.
					// Si no hay Directiva, no hay VP Ejecutiva, etc.
					directivaId: !type || hasNoHierarchy,
					vicepresidenciaEjecutivaId:
						!type || hasNoHierarchy || (!hasNoHierarchy && !state.formData.directivaId),
					vicepresidenciaId:
						!type ||
						hasNoHierarchy ||
						(!hasNoHierarchy && !state.formData.vicepresidenciaEjecutivaId),
					departamentoId:
						!type ||
						hasNoHierarchy ||
						(!hasNoHierarchy && !state.formData.vicepresidenciaId),
					cargoId: !type || hasNoHierarchy
				},
				required: {
					...state.required,
					name: !isGeneric,
					lastName: !isGeneric,
					employeeCode: isRegular,
					nationality: !isGeneric,
					cedula: !isGeneric,
					// LOGICA DE REQUERIDOS:
					// 1. Directiva y Cargo son base para empleados normales
					directivaId: isContractor || isRegular,
					cargoId: isContractor || isRegular,

					// 2. VP Ejecutiva es requerida SOLO si no es restringido Y se seleccionó una VP (Hijo)
					// Esto asegura integridad: No puedes tener VP sin tener VP Ejecutiva.
					vicepresidenciaEjecutivaId:
						!hasNoHierarchy && !!state.formData.vicepresidenciaId,

					// 3. VP es requerida si hay un Departamento seleccionado
					vicepresidenciaId: !hasNoHierarchy && !!state.formData.departamentoId
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
						allowedDomains: state.formData.allowedDomains ?? []
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
