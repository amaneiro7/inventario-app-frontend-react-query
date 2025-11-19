import { type PermissionParams } from '../../domain/dto/Permission.dto'
import { PermissionDescription } from '../../domain/value-object/PermissionDescription'
import { PermissionName } from '../../domain/value-object/PermissionName'

/**
 * @typedef {Object} DefaultPermission
 * @description Tipo que extiende `PermissionParams` para incluir una propiedad `updatedAt` opcional.
 * Representa el estado por defecto de una marca en el formulario.
 * @property {string} [updatedAt] - Fecha de la última actualización de la marca (opcional).
 */
export type DefaultPermission = PermissionParams & {
	updatedAt?: string
}

/**
 * @interface PermissionErrors
 * @description Define la estructura de los errores de validación para el formulario de `Permission`.
 * @property {string} name - Mensaje de error para el campo `name`.
 */
export interface PermissionErrors {
	name: string
	description: string
}

/**
 * @interface State
 * @description Define la estructura del estado para el reducer del formulario de `Permission`.
 * @property {DefaultPermission} formData - Los datos del formulario de la marca.
 * @property {PermissionErrors} errors - Los errores de validación asociados a los campos del formulario.
 */
export interface State {
	formData: DefaultPermission
	errors: PermissionErrors
}

/**
 * Estado inicial del reducer del formulario de `Permission`.
 * @type {State}
 */
export const initialPermissionState: State = {
	formData: {
		id: undefined,
		description: '',
		name: '',
		updatedAt: undefined
	},
	errors: {
		name: '',
		description: ''
	}
}

/**
 * @typedef {(
 *   { type: 'init'; payload: { formData: PermissionParams } } |
 *   { type: 'reset'; payload: { formData: PermissionParams } } |
 *   { type: 'name'; payload: { value: PermissionParams['name'] } }
 *  { type: 'description'; payload: { value: PermissionParams['description'] } }
 * )} Action
 * @description Tipos de acciones que puede manejar el reducer del formulario de `Permission`.
 */
export type Action =
	| { type: 'init'; payload: { formData: PermissionParams } }
	| { type: 'reset'; payload: { formData: PermissionParams } }
	| { type: 'name'; payload: { value: PermissionParams['name'] } }
	| { type: 'description'; payload: { value: PermissionParams['description'] } }

/**
 * `PermissionFormReducer`
 * @function
 * @description Reducer para gestionar el estado del formulario de `Permission`.
 * Maneja diferentes acciones para inicializar, resetear, actualizar campos y gestionar categorías.
 * @param {State} state - El estado actual del reducer.
 * @param {Action} action - La acción a despachar.
 * @returns {State} El nuevo estado después de aplicar la acción.
 */
export const permissionFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialPermissionState.errors }
			}
		}
		case 'reset':
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialPermissionState.errors }
			}
		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name },
				errors: {
					...state.errors,
					name: PermissionName.isValid(name) ? '' : PermissionName.invalidMessage(name)
				}
			}
		}
		case 'description': {
			const description = action.payload.value
			return {
				...state,
				formData: { ...state.formData, description },
				errors: {
					...state.errors,
					description: PermissionDescription.isValid(description)
						? ''
						: PermissionDescription.invalidMessage(description)
				}
			}
		}
		default:
			return state
	}
}
