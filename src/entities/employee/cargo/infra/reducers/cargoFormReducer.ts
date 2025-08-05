import { CargoParams } from '../../domain/dto/Cargo.dto'
import { CargoName } from '../../domain/value-object/CargoName'

/**
 * Represents the default structure for a cargo's form data.
 */
export type DefaultCargo = CargoParams & {
	updatedAt?: string
}

/**
 * Defines the structure for validation errors in the cargo form.
 */
export interface CargoErrors {
	name: string
}

/**
 * Defines which fields in the cargo form are required based on current state.
 */
export interface CargoRequired {
	name: boolean
	departamentos: boolean
}

/**
 * Defines which fields in the cargo form are disabled based on current state.
 */
export interface CargoDisabled {
	name: boolean
	departamentos: boolean
}

/**
 * Represents the entire state managed by the cargo form reducer.
 */
export interface State {
	formData: DefaultCargo
	errors: CargoErrors
	required: CargoRequired
	disabled: CargoDisabled
}

/**
 * The initial state for the cargo form reducer.
 */
export const initialCargoState: State = {
	formData: {
		id: '',
		name: '',
		departamentos: [],
		updatedAt: undefined
	},
	errors: {
		name: ''
	},
	required: {
		name: true,
		departamentos: false
	},
	disabled: {
		name: false,
		departamentos: false
	}
}

/**
 * Defines the possible actions that can be dispatched to the cargo form reducer.
 */
export type Action =
	| { type: 'init'; payload: { formData: DefaultCargo } }
	| { type: 'reset'; payload: { formData: DefaultCargo } }
	| { type: 'addDepartamento'; payload: { value: string } }
	| { type: 'removeDepartamento'; payload: { value: string } }
	| { type: 'name'; payload: { value: DefaultCargo['name'] } }

/**
 * Reducer function for managing the state of the cargo form.
 * It handles various actions to update form data, errors, required fields, and disabled fields.
 * @param state - The current state of the form.
 * @param action - The dispatched action.
 * @returns The new state after applying the action.
 */
export const cargoFormReducer = (state: State, action: Action): State => {
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
					name: CargoName.isValid(name) ? '' : CargoName.invalidMessage()
				}
			}
		}
		/**
		 * Adds a new department ID to the form data.
		 */
		case 'addDepartamento': {
			const departamentos = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					departamentos: [...state.formData.departamentos, departamentos]
				}
			}
		}
		/**
		 * Removes a department ID from the form data.
		 */
		case 'removeDepartamento': {
			const departamentos = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					departamentos: state.formData.departamentos.filter(d => d !== departamentos)
				}
			}
		}
		default:
			return state
	}
}