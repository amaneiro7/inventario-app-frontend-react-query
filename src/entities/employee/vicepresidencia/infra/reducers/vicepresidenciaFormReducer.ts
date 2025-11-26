import {
	type VicepresidenciaDto,
	type VicepresidenciaParams
} from '../../domain/dto/Vicepresidencia.dto'
import { VicepresidenciaName } from '../../domain/value-object/VicepresidenciaName'

/**
 * Represents the default structure for a vicepresidencia's form data.
 */
export type DefaultVicepresidencia = VicepresidenciaParams & {
	directivaId: VicepresidenciaDto['vicepresidenciaEjecutiva']['directivaId']
	updatedAt?: string
}

/**
 * Defines the structure for validation errors in the vicepresidencia form.
 */
export interface VicepresidenciaErrors extends Record<string, string> {
	name: string
}

/**
 * Defines which fields in the vicepresidencia form are required based on current state.
 */
export interface VicepresidenciaRequired extends Record<string, boolean> {
	name: boolean
	directivaId: boolean
	vicepresidenciaEjecutivaId: boolean
	cargos: boolean
}

/**
 * Defines which fields in the vicepresidencia form are disabled based on current state.
 */
export interface VicepresidenciaDisabled extends Record<string, boolean> {
	name: boolean
	directivaId: boolean
	vicepresidenciaEjecutivaId: boolean
	cargos: boolean
}

export interface State {
	formData: DefaultVicepresidencia
	errors: VicepresidenciaErrors
	required: VicepresidenciaRequired
	disabled: VicepresidenciaDisabled
}

/**
 * The initial state for the vicepresidencia form reducer.
 */
export const initialVicepresidenciaState: State = {
	formData: {
		id: undefined,
		name: '',
		directivaId: '',
		vicepresidenciaEjecutivaId: '',
		cargos: [],
		updatedAt: undefined
	},
	errors: {
		name: ''
	},
	required: {
		name: true,
		vicepresidenciaEjecutivaId: true,
		directivaId: true,
		cargos: false
	},
	disabled: {
		directivaId: false,
		vicepresidenciaEjecutivaId: true,
		name: false,
		cargos: false
	}
}

/**
 * Defines the possible actions that can be dispatched to the vicepresidencia form reducer.
 */
export type Action =
	| { type: 'init'; payload: { formData: DefaultVicepresidencia } }
	| { type: 'reset'; payload: { formData: DefaultVicepresidencia } }
	| { type: 'name'; payload: { value: DefaultVicepresidencia['name'] } }
	| { type: 'directivaId'; payload: { value: DefaultVicepresidencia['directivaId'] } }
	| {
			type: 'vicepresidenciaEjecutivaId'
			payload: { value: DefaultVicepresidencia['vicepresidenciaEjecutivaId'] }
	  }
	| { type: 'addCargo'; payload: { value: string } }
	| { type: 'removeCargo'; payload: { value: string } }

/**
 * Reducer function for managing the state of the vicepresidencia form.
 * It handles various actions to update form data, errors, required fields, and disabled fields.
 * @param state - The current state of the form.
 * @param action - The dispatched action.
 * @returns The new state after applying the action.
 */
export const vicepresidenciaFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		/**
		 * Initializes or resets the form data. Also updates disabled states for dependent fields.
		 */
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				disabled: {
					...state.disabled,
					vicepresidenciaEjecutivaId: !action.payload.formData.directivaId
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
					name: VicepresidenciaName.isValid(name)
						? ''
						: VicepresidenciaName.invalidMessage()
				}
			}
		}
		/**
		 * Updates the directivaId field and updates disabled states for dependent fields.
		 */
		case 'directivaId': {
			const directivaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, directivaId },
				disabled: {
					...state.disabled,
					vicepresidenciaEjecutivaId: !directivaId
				}
			}
		}
		/**
		 * Updates the vicepresidenciaEjecutivaId field.
		 */
		case 'vicepresidenciaEjecutivaId': {
			const vicepresidenciaEjecutivaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, vicepresidenciaEjecutivaId }
			}
		}
		/**
		 * Adds a new cargo ID to the form data.
		 */
		case 'addCargo': {
			const cargos = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					cargos: [...state.formData.cargos, cargos]
				}
			}
		}
		/**
		 * Removes a cargo ID from the form data.
		 */
		case 'removeCargo': {
			const cargos = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					cargos: state.formData.cargos.filter(c => c !== cargos)
				}
			}
		}
		default:
			return state
	}
}
