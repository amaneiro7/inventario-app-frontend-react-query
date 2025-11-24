import { type AccessPolicyParams } from '../../domain/dto/AccessPolicy.dto'
import { AccessPolicyPriority } from '../../domain/value-object/AccessPolicyPriority'
import { AccessPolicyName } from '../../domain/value-object/AceessPolicyName'

/**
 * @typedef {Object} DefaultAccessPolicy
 * @description Tipo que extiende `AccessPolicyParams` para incluir una propiedad `updatedAt` opcional.
 * Representa el estado por defecto de una marca en el formulario.
 * @property {string} [updatedAt] - Fecha de la última actualización de la marca (opcional).
 */
export type DefaultAccessPolicy = AccessPolicyParams & {
	updatedAt?: string
}

/**
 * @interface AccessPolicyErrors
 * @description Define la estructura de los errores de validación para el formulario de `AccessPolicy`.
 * @property {string} name - Mensaje de error para el campo `name`.
 */
export interface AccessPolicyErrors {
	name: string
	priority: string
}

/**
 * @interface State
 * @description Define la estructura del estado para el reducer del formulario de `AccessPolicy`.
 * @property {DefaultAccessPolicy} formData - Los datos del formulario de la marca.
 * @property {AccessPolicyErrors} errors - Los errores de validación asociados a los campos del formulario.
 */
export interface State {
	formData: DefaultAccessPolicy
	errors: AccessPolicyErrors
}

/**
 * Estado inicial del reducer del formulario de `AccessPolicy`.
 * @type {State}
 */
export const initialAccessPolicyState: State = {
	formData: {
		id: undefined,
		name: '',
		cargoId: '',
		departamentoId: '',
		permissionGroupId: '',
		priority: 1,
		updatedAt: undefined
	},
	errors: {
		name: '',
		priority: ''
	}
}

/**
 * @typedef {(
 *   { type: 'init'; payload: { formData: AccessPolicyParams } } |
 *   { type: 'reset'; payload: { formData: AccessPolicyParams } } |
 *	 { type: 'name'; payload: { value: AccessPolicyParams['name'] } } |
 *	 { type: 'cargoId'; payload: { value: AccessPolicyParams['cargoId'] } } |
 *	 { type: 'departamentoId'; payload: { value: AccessPolicyParams['departamentoId'] } } |
 *	 { type: 'permissionGroupId'; payload: { value: AccessPolicyParams['permissionGroupId'] } } |
 *	 { type: 'priority'; payload: { value: AccessPolicyParams['priority'] } }
 * )} Action
 * @description Tipos de acciones que puede manejar el reducer del formulario de `AccessPolicy`.
 */
export type Action =
	| { type: 'init'; payload: { formData: AccessPolicyParams } }
	| { type: 'reset'; payload: { formData: AccessPolicyParams } }
	| { type: 'name'; payload: { value: AccessPolicyParams['name'] } }
	| { type: 'cargoId'; payload: { value: AccessPolicyParams['cargoId'] } }
	| { type: 'departamentoId'; payload: { value: AccessPolicyParams['departamentoId'] } }
	| { type: 'permissionGroupId'; payload: { value: AccessPolicyParams['permissionGroupId'] } }
	| { type: 'priority'; payload: { value: AccessPolicyParams['priority'] } }

/**
 * `AccessPolicyFormReducer`
 * @function
 * @description Reducer para gestionar el estado del formulario de `AccessPolicy`.
 * Maneja diferentes acciones para inicializar, resetear, actualizar campos y gestionar categorías.
 * @param {State} state - El estado actual del reducer.
 * @param {Action} action - La acción a despachar.
 * @returns {State} El nuevo estado después de aplicar la acción.
 */
export const accessPolicyFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'init':
		case 'reset': {
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialAccessPolicyState.errors }
			}
		}
		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name },
				errors: {
					...state.errors,
					name: AccessPolicyName.isValid(name)
						? ''
						: AccessPolicyName.invalidMessage(name)
				}
			}
		}
		case 'priority': {
			const priority = action.payload.value
			return {
				...state,
				formData: { ...state.formData, priority },
				errors: {
					...state.errors,
					priority: AccessPolicyPriority.isValid(priority)
						? ''
						: AccessPolicyPriority.invalidMessage(priority)
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
		case 'departamentoId': {
			const departamentoId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, departamentoId }
			}
		}
		case 'permissionGroupId': {
			const permissionGroupId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, permissionGroupId }
			}
		}
		default:
			return state
	}
}
