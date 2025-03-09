import { CityParams } from '../../domain/dto/City.dto'
import { CityName } from '../../domain/value-object/CityName'

export interface CityErrors {
	name: string
}

export interface State {
	formData: CityParams
	errors: CityErrors
}

export const initialCityState: State = {
	formData: {
		id: undefined,
		name: '',
		stateId: ''
	},
	errors: {
		name: ''
	}
}

export type Action =
	| { type: 'init'; payload: { formData: CityParams } }
	| { type: 'reset'; payload: { formData: CityParams } }
	| { type: 'name'; payload: { value: CityParams['name'] } }
	| { type: 'stateId'; payload: { value: CityParams['stateId'] } }
	| { type: 'regionId'; payload: { value: CityParams['stateId'] } }

export const CityFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialCityState.errors }
			}
		}
		case 'reset':
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialCityState.errors }
			}
		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name },
				errors: {
					...state.errors,
					name: CityName.isValid(name) ? '' : CityName.invalidMessage(name)
				}
			}
		}
		default:
			return state
	}
}
