import { type CargoParams } from '../../domain/dto/Cargo.dto'
import { CargoName } from '../../domain/value-object/CargoName'

export type DefaultCargo = CargoParams & {
	updatedAt?: string
}

export interface CargoErrors extends Record<string, string> {
	name: string
}

export interface CargoRequired extends Record<string, boolean> {
	name: boolean
	unidades: boolean
}

export interface CargoDisabled extends Record<string, boolean> {
	name: boolean
	unidades: boolean
}

interface State {
	formData: DefaultCargo
	errors: CargoErrors
	required: CargoRequired
	disabled: CargoDisabled
}

export const initialCargoState: State = {
	formData: {
		id: '',
		name: '',
		unidades: [],
		updatedAt: undefined
	},
	errors: {
		name: ''
	},
	required: {
		name: true,
		unidades: false
	},
	disabled: {
		name: false,
		unidades: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultCargo } }
	| { type: 'reset'; payload: { formData: DefaultCargo } }
	| { type: 'addUnidad'; payload: { value: string } }
	| { type: 'removeUnidad'; payload: { value: string } }
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
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData }
			}
		}
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
		case 'addUnidad': {
			const unidades = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					unidades: [...state.formData.unidades, unidades]
				}
			}
		}
		case 'removeUnidad': {
			const unidades = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					unidades: state.formData.unidades.filter(d => d !== unidades)
				}
			}
		}
		default:
			return state
	}
}
