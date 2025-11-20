import { type PermissionGroupParams } from '../../domain/dto/PermissionGroup.dto'
import { PermissionGroupDescription } from '../../domain/value-object/PermissionGroupDescription'
import { PermissionGroupName } from '../../domain/value-object/PermissionGroupName'

/**
 * @typedef {Object} DefaultPermissionGroup
 * @description Tipo que extiende `PermissionParams` para incluir una propiedad `updatedAt` opcional.
 * Representa el estado por defecto de una marca en el formulario.
 * @property {string} [updatedAt] - Fecha de la última actualización de la marca (opcional).
 */
export type DefaultPermissionGroup = PermissionGroupParams & {
	updatedAt?: string
}

/**
 * @interface PermissionGroupErrors
 * @description Define la estructura de los errores de validación para el formulario de `Permission`.
 * @property {string} name - Mensaje de error para el campo `name`.
 */
export interface PermissionGroupErrors {
	name: string
	description?: string
}

/**
 * @interface State
 * @description Define la estructura del estado para el reducer del formulario de `Permission`.
 * @property {DefaultPermission} formData - Los datos del formulario de la marca.
 * @property {PermissionErrors} errors - Los errores de validación asociados a los campos del formulario.
 */
export interface State {
	formData: DefaultPermissionGroup
	errors: PermissionGroupErrors
}

/**
 * Estado inicial del reducer del formulario de `Permission`.
 * @type {State}
 */
export const initialPermissionGroupState: State = {
	formData: {
		id: undefined,
		name: '',
		description: '',
		permissions: [],
		updatedAt: undefined
	},
	errors: {
		name: ''
	}
}

/**
 * @typedef {(
 *   { type: 'init'; payload: { formData: PermissionGroupParams } } |
 *   { type: 'reset'; payload: { formData: PermissionGroupParams } } |
 *   { type: 'name'; payload: { value: PermissionGroupParams['name'] } } |
 *   { type: 'description'; payload: { value: PermissionGroupParams['description'] } } |
 *   { type: 'addPermission'; payload: { value: string } } |
 *   { type: 'removePermission'; payload: { value: string } }
 * )} Action
 * @description Tipos de acciones que puede manejar el reducer del formulario de `Permission`.
 */
export type Action =
	| { type: 'init'; payload: { formData: PermissionGroupParams } }
	| { type: 'reset'; payload: { formData: PermissionGroupParams } }
	| { type: 'name'; payload: { value: PermissionGroupParams['name'] } }
	| { type: 'description'; payload: { value: PermissionGroupParams['description'] } }
	| { type: 'addPermission'; payload: { value: string } }
	| { type: 'removePermission'; payload: { value: string } }

/**
 * `PermissionFormReducer`
 * @function
 * @description Reducer para gestionar el estado del formulario de `Permission`.
 * Maneja diferentes acciones para inicializar, resetear, actualizar campos y gestionar categorías.
 * @param {State} state - El estado actual del reducer.
 * @param {Action} action - La acción a despachar.
 * @returns {State} El nuevo estado después de aplicar la acción.
 */
export const permissionGroupFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialPermissionGroupState.errors }
			}
		}
		case 'reset':
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialPermissionGroupState.errors }
			}
		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name },
				errors: {
					...state.errors,
					name: PermissionGroupName.isValid(name)
						? ''
						: PermissionGroupName.invalidMessage(name)
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
					description: PermissionGroupDescription.isValid(description)
						? ''
						: PermissionGroupDescription.invalidMessage(description)
				}
			}
		}
		case 'addPermission': {
			const permissions = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					permissions: [...state.formData.permissions, permissions]
				}
			}
		}
		case 'removePermission': {
			const permissions = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					permissions: state.formData.permissions.filter(c => c !== permissions)
				}
			}
		}
		default:
			return state
	}
}
