import { type CityDto, type CityParams } from '../../domain/dto/City.dto'
import { CityName } from '../../domain/value-object/CityName'

export interface DefaultCity extends CityParams {
	regionId: CityDto['state']['regionId']
	administrativeRegionId: CityDto['state']['region']['administrativeRegionId']
}

export interface CityErrors {
	name: string
}
export interface CityRequired {
	name: boolean
	stateId: boolean
	regionId: boolean
	administrativeRegionId: boolean
}

export interface State {
	formData: DefaultCity
	errors: CityErrors
	required: CityRequired
}

export const initialCityState: State = {
	formData: {
		id: undefined,
		name: '',
		stateId: '',
		regionId: '',
		administrativeRegionId: ''
	},
	errors: {
		name: ''
	},
	required: {
		name: true,
		stateId: true,
		regionId: false,
		administrativeRegionId: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultCity } }
	| { type: 'reset'; payload: { formData: DefaultCity } }
	| { type: 'name'; payload: { value: DefaultCity['name'] } }
	| { type: 'stateId'; payload: { value: DefaultCity['stateId'] } }
	| { type: 'regionId'; payload: { value: DefaultCity['regionId'] } }
	| { type: 'administrativeRegionId'; payload: { value: DefaultCity['administrativeRegionId'] } }

export const cityFormReducer = (state: State, action: Action): State => {
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
					name: CityName.isValid(name) ? '' : CityName.invalidMessage(name)
				}
			}
		}
		case 'stateId': {
			const stateId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					stateId
				}
			}
		}
		case 'regionId': {
			const regionId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					stateId: '',
					regionId
				}
			}
		}
		case 'administrativeRegionId': {
			const administrativeRegionId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					stateId: '',
					regionId: '',
					administrativeRegionId
				}
			}
		}
		default:
			return state
	}
}
