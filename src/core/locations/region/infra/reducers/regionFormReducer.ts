import { type RegionDto, type RegionParams } from '../../domain/dto/region.dto'

export interface DefaultRegion extends RegionParams {
	administrativeRegionId: RegionDto['administrativeRegionId']
}

export interface RegionErrors {
	name: string
}
export interface RegionRequired {
	name: boolean
	administrativeRegionId: boolean
}
export interface RegionDisabled {
	name: boolean
	administrativeRegionId: boolean
}

export interface State {
	formData: DefaultRegion
	errors: RegionErrors
	required: RegionRequired
	disabled: RegionDisabled
}

export const initialRegionState: State = {
	formData: {
		id: undefined,
		name: '',
		administrativeRegionId: ''
	},
	errors: {
		name: ''
	},
	required: {
		name: true,
		administrativeRegionId: false
	},
	disabled: {
		name: true,
		administrativeRegionId: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultRegion } }
	| { type: 'reset'; payload: { formData: DefaultRegion } }
	| {
			type: 'administrativeRegionId'
			payload: { value: DefaultRegion['administrativeRegionId'] }
	  }

export const regionFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData }
			}
		}
		case 'administrativeRegionId': {
			const administrativeRegionId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					administrativeRegionId
				}
			}
		}
		default:
			return state
	}
}
