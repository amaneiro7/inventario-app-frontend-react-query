import { type DirectivaDto, type DirectivaParams } from '../../domain/dto/Directiva.dto'
import { DirectivaName } from '../../domain/value-object/DirectivaName'

/**
 * Represents the default structure for a directiva's form data.
 */
export type DefaultDirectiva = DirectivaParams & {
	updatedAt?: string
}

/**
 * Defines the structure for validation errors in the directiva form.
 */
export interface DirectivaErrors {
	name: DirectivaDto['name']
}

/**
 * Defines which fields in the directiva form are required based on current state.
 */
export interface DirectivaRequired {
	name: boolean
	cargos: boolean
}

export interface State {
	formData: DefaultDirectiva
	errors: DirectivaErrors
	required: DirectivaRequired
}

/**
 * The initial state for the directiva form reducer.
 */
export const initialDirectivaState: State = {
	formData: {
		id: undefined,
		name: '',
		cargos: [],
		updatedAt: undefined
	},
	errors: {
		name: ''
	},
	required: {
		name: true,
		cargos: false
	}
}

/**
 * Defines the possible actions that can be dispatched to the directiva form reducer.
 */
export type Action =
	| { type: 'init'; payload: { formData: DefaultDirectiva } }
	| { type: 'reset'; payload: { formData: DefaultDirectiva } }
	| { type: 'name'; payload: { value: DefaultDirectiva['name'] } }
	| { type: 'addCargo'; payload: { value: string } }
	| { type: 'removeCargo'; payload: { value: string } }

/**
 * Reducer function for managing the state of the directiva form.
 * It handles various actions to update form data, errors, and required fields.
 * @param state - The current state of the form.
 * @param action - The dispatched action.
 * @returns The new state after applying the action.
 */
export const directivaFormReducer = (state: State, action: Action): State => {
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
					name: DirectivaName.isValid(name) ? '' : DirectivaName.invalidMessage()
				}
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