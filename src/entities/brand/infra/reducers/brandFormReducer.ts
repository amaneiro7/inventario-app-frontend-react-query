import { type BrandParams } from '@/entities/brand/domain/dto/Brand.dto'
import { BrandName } from '../../domain/value-object/BrandName'

export type DefaultBrand = BrandParams & {
	updatedAt?: string
}

export interface BrandErrors {
	name: string
}

export interface State {
	formData: DefaultBrand
	errors: BrandErrors
}

export const initialBrandState: State = {
	formData: {
		id: undefined,
		name: '',
		categories: [],
		updatedAt: undefined
	},
	errors: {
		name: ''
	}
}

export type Action =
	| { type: 'init'; payload: { formData: BrandParams } }
	| { type: 'reset'; payload: { formData: BrandParams } }
	| { type: 'name'; payload: { value: BrandParams['name'] } }
	| { type: 'addCategory'; payload: { value: string } }
	| { type: 'removeCategory'; payload: { value: string } }

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
		case 'addCategory': {
			const categories = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					categories: [...state.formData.categories, categories]
				}
			}
		}
		case 'removeCategory': {
			const categories = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					categories: state.formData.categories.filter(c => c !== categories)
				}
			}
		}
		default:
			return state
	}
}
