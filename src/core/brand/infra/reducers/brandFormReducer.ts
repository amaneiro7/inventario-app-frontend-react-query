import { type BrandParams } from '@/core/brand/domain/dto/Brand.dto'

export const initialBrandState: BrandParams = {
	id: undefined,
	name: ''
}

export type Action =
	| { type: 'init'; payload: { formData: BrandParams } }
	| { type: 'reset'; payload: { formData: BrandParams } }
	| { type: 'name'; payload: { value: string } }

export const brandFormReducer = (state: BrandParams, action: Action): BrandParams => {
	switch (action.type) {
		case 'init':
			return {
				...state,
				...action.payload.formData
			}
		case 'reset':
			return {
				...state,
				...action.payload.formData
			}
		case 'name':
			return {
				...state,
				name: action.payload.value
			}
		default:
			return state
	}
}
