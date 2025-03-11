import { type DirectivaDto, type DirectivaParams } from '../../domain/dto/Directiva.dto'
import { DirectivaName } from '../../domain/value-object/DirectivaName'

export type DefaultDirectiva = DirectivaParams

export interface DirectivaErrors {
	name: DirectivaDto['name']
}
export interface DirectivaRequired {
	name: boolean
}

export interface State {
	formData: DefaultDirectiva
	errors: DirectivaErrors
	required: DirectivaRequired
}

export const initialDirectivaState: State = {
	formData: {
		id: undefined,
		name: ''
	},
	errors: {
		name: ''
	},
	required: {
		name: true
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultDirectiva } }
	| { type: 'reset'; payload: { formData: DefaultDirectiva } }
	| { type: 'name'; payload: { value: DefaultDirectiva['name'] } }

export const directivaFormReducer = (state: State, action: Action): State => {
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
					name: DirectivaName.isValid(name) ? '' : DirectivaName.invalidMessage()
				}
			}
		}
		default:
			return state
	}
}
