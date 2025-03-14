import { CargoParams } from '../../domain/dto/Cargo.dto'
import { CargoName } from '../../domain/value-object/CargoName'

export type DefaultCargo = CargoParams & {
	updatedAt?: string
}

export interface CargoErrors {
	name: string
}
export interface CargoRequired {
	name: boolean
	departamentos: boolean
}
export interface CargoDisabled {
	name: boolean
	departamentos: boolean
}

export interface State {
	formData: DefaultCargo
	errors: CargoErrors
	required: CargoRequired
	disabled: CargoDisabled
}

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

export type Action =
	| { type: 'init'; payload: { formData: DefaultCargo } }
	| { type: 'reset'; payload: { formData: DefaultCargo } }
	| { type: 'addDepartamento'; payload: { value: string } }
	| { type: 'removeDepartamento'; payload: { value: string } }
	| { type: 'name'; payload: { value: DefaultCargo['name'] } }

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
