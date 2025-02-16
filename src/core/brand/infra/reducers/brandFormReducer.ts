import { type BrandParams } from '@/core/brand/domain/dto/Brand.dto'
import { BrandName } from '../../domain/value-object/BrandName'

export interface BrandErrors {
	name: string
}

export interface State {
	formData: BrandParams
	errors: BrandErrors
}

export const initialBrandState: State = {
	formData: {
		id: undefined,
		name: ''
	},
	errors: {
		name: ''
	}
}

export type Action =
	| { type: 'init'; payload: { formData: BrandParams } }
	| { type: 'reset'; payload: { formData: BrandParams } }
	| { type: 'name'; payload: { value: BrandParams['name'] } }

export const brandFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialBrandState.errors }
			}
		}
		case 'reset':
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialBrandState.errors }
			}
		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name },
				errors: {
					...state.errors,
					name: BrandName.isValid(name) ? '' : BrandName.invalidMessage(name)
				}
			}
		}
		default:
			return state
	}
}
