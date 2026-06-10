import { type MigrationRuleParams } from '../../domain/dto/MigrationRule.dto'
import { MigrationRuleMinDiskGb } from '../../domain/value-object/MigrationRuleMinDiskGb'
import { MigrationRuleMinRamGb } from '../../domain/value-object/MigrationRuleMinRamGb'

/**
 * @typedef {Object} DefaultMigrationRule
 * @description Tipo que extiende `PermissionParams` para incluir una propiedad `updatedAt` opcional.
 * Representa el estado por defecto de una marca en el formulario.
 * @property {string} [updatedAt] - Fecha de la última actualización de la marca (opcional).
 */
export type DefaultMigrationRule = MigrationRuleParams & {
	updatedAt?: string
}

/**
 * @interface MigrationRuleErrors
 * @description Define la estructura de los errores de validación para el formulario de `Permission`.
 * @property {string} name - Mensaje de error para el campo `name`.
 */
export interface MigrationRuleErrors extends Record<string, string> {
	minRamGb: string
	minDiskGb: string
	isActive: string
}
export interface MigrationRuleRequired extends Record<string, boolean> {
	minRamGb: boolean
	minDiskGb: boolean
	isActive: boolean
}
export interface MigrationRuleDisabled extends Record<string, boolean> {
	minRamGb: boolean
	minDiskGb: boolean
	isActive: boolean
}

/**
 * @interface State
 * @description Define la estructura del estado para el reducer del formulario de `Permission`.
 * @property {DefaultPermission} formData - Los datos del formulario de la marca.
 * @property {PermissionErrors} errors - Los errores de validación asociados a los campos del formulario.
 */
interface State {
	formData: DefaultMigrationRule
	errors: MigrationRuleErrors
	required: MigrationRuleRequired
	disabled: MigrationRuleDisabled
}

/**
 * Estado inicial del reducer del formulario de `Permission`.
 * @type {State}
 */
export const initialMigrationRuleState: State = {
	formData: {
		id: undefined,
		minRamGb: 1,
		minDiskGb: 1,
		isActive: true,
		approvedProcessor: [],
		updatedAt: undefined
	},
	errors: {
		minRamGb: '',
		minDiskGb: '',
		isActive: ''
	},
	disabled: {
		minRamGb: false,
		minDiskGb: false,
		isActive: false
	},
	required: {
		minRamGb: true,
		minDiskGb: true,
		isActive: true
	}
}

/**
 * @typedef {(
 *   { type: 'init'; payload: { formData: MigrationRuleParams } } |
 *   { type: 'reset'; payload: { formData: MigrationRuleParams } } |
 *   { type: 'minRamGb'; payload: { value: MigrationRuleParams['minRamGb'] } } |
 *   { type: 'minDiskGb'; payload: { value: MigrationRuleParams['minDiskGb'] } } |
 *   { type: 'isActive'; payload: { value: MigrationRuleParams['isActive'] } } |
 *   { type: 'addPermission'; payload: { value: string } } |
 *   { type: 'removePermission'; payload: { value: string } }
 * )} Action
 * @description Tipos de acciones que puede manejar el reducer del formulario de `Permission`.
 */
export type Action =
	| { type: 'init'; payload: { formData: MigrationRuleParams } }
	| { type: 'reset'; payload: { formData: MigrationRuleParams } }
	| { type: 'minRamGb'; payload: { value: MigrationRuleParams['minRamGb'] } }
	| { type: 'minDiskGb'; payload: { value: MigrationRuleParams['minDiskGb'] } }
	| { type: 'isActive'; payload: { value: MigrationRuleParams['isActive'] } }
	| { type: 'addProcessor'; payload: { value: string } }
	| { type: 'removeProcessor'; payload: { value: string } }

/**
 * `PermissionFormReducer`
 * @function
 * @description Reducer para gestionar el estado del formulario de `Permission`.
 * Maneja diferentes acciones para inicializar, resetear, actualizar campos y gestionar categorías.
 * @param {State} state - El estado actual del reducer.
 * @param {Action} action - La acción a despachar.
 * @returns {State} El nuevo estado después de aplicar la acción.
 */
export const migrationRuleFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialMigrationRuleState.errors }
			}
		}
		case 'reset':
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialMigrationRuleState.errors }
			}
		case 'minRamGb': {
			const minRamGb = action.payload.value
			return {
				...state,
				formData: { ...state.formData, minRamGb },
				errors: {
					...state.errors,
					minRamGb: MigrationRuleMinRamGb.isValid(minRamGb)
						? ''
						: MigrationRuleMinRamGb.invalidMessage(minRamGb)
				}
			}
		}
		case 'minDiskGb': {
			const minDiskGb = action.payload.value
			return {
				...state,
				formData: { ...state.formData, minDiskGb },
				errors: {
					...state.errors,
					minDiskGb: MigrationRuleMinDiskGb.isValid(minDiskGb)
						? ''
						: MigrationRuleMinDiskGb.invalidMessage(minDiskGb)
				}
			}
		}
		case 'isActive': {
			const isActive = action.payload.value
			return {
				...state,
				formData: { ...state.formData, isActive }
			}
		}
		case 'addProcessor': {
			const processors = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					approvedProcessor: [...state.formData.approvedProcessor, processors]
				}
			}
		}
		case 'removeProcessor': {
			const processors = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					approvedProcessor: state.formData.approvedProcessor.filter(
						c => c !== processors
					)
				}
			}
		}
		default:
			return state
	}
}
