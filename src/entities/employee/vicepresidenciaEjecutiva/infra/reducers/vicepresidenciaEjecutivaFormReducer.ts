import { type VicepresidenciaEjecutivaParams } from '../../domain/dto/VicepresidenciaEjecutiva.dto'
import { VicepresidenciaEjecutivaName } from '../../domain/value-object/VicepresidenciaEjecutivaName'

/**
 * Represents the default structure for an executive vicepresidencia's form data.
 */
export type DefaultVicepresidenciaEjecutiva = VicepresidenciaEjecutivaParams & {
	updatedAt?: string
}

/**
 * Defines the structure for validation errors in the executive vicepresidencia form.
 */
export interface VicepresidenciaEjecutivaErrors {
	name: string
	directivaId: string
}

/**
 * Defines which fields in the executive vicepresidencia form are required based on current state.
 */
export interface VicepresidenciaEjecutivaRequired {
	name: boolean
	directivaId: boolean
	cargos: boolean
}

export interface State {
	formData: DefaultVicepresidenciaEjecutiva
	errors: VicepresidenciaEjecutivaErrors
	required: VicepresidenciaEjecutivaRequired
}

/**
 * The initial state for the executive vicepresidencia form reducer.
 */
export const initialVicepresidenciaEjecutivaState: State = {
	formData: {
		id: undefined,
		name: '',
		directivaId: '',
		cargos: [],
		updatedAt: undefined
	},
	errors: {
		name: '',
		directivaId: ''
	},
	required: {
		name: true,
		directivaId: true,
		cargos: false
	}
}

/**
 * Defines the possible actions that can be dispatched to the executive vicepresidencia form reducer.
 */
export type Action =
	| { type: 'init'; payload: { formData: DefaultVicepresidenciaEjecutiva } }
	| { type: 'reset'; payload: { formData: DefaultVicepresidenciaEjecutiva } }
	| { type: 'name'; payload: { value: DefaultVicepresidenciaEjecutiva['name'] } }
	| { type: 'directivaId'; payload: { value: DefaultVicepresidenciaEjecutiva['directivaId'] } }
	| { type: 'addCargo'; payload: { value: string } }
	| { type: 'removeCargo'; payload: { value: string } }

/**
 * Reducer function for managing the state of the executive vicepresidencia form.
 * It handles various actions to update form data, errors, and required fields.
 * @param state - The current state of the form.
 * @param action - The dispatched action.
 * @returns The new state after applying the action.
 */
export const vicepresidenciaEjecutivaFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		/**
		 * Initializes or resets the form data.
		 */
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData }
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
					name: VicepresidenciaEjecutivaName.isValid(name)
						? ''
						: VicepresidenciaEjecutivaName.invalidMessage()
				}
			}
		}
		/**
		 * Updates the directivaId field.
		 */
		case 'directivaId': {
			const directivaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, directivaId }
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