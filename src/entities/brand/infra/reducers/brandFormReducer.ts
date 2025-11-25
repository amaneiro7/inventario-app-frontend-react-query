import { type BrandParams } from '@/entities/brand/domain/dto/Brand.dto'
import { BrandName } from '@/entities/brand/domain/value-object/BrandName'

export type DefaultBrand = BrandParams & {
	updatedAt?: string
}

export interface BrandErrors extends Record<string, string> {
	name: string
}
export interface BrandRequired extends Record<string, boolean> {
	name: boolean
}
export interface BrandDisabled extends Record<string, boolean> {
	name: boolean
}

export interface State {
	formData: DefaultBrand
	errors: BrandErrors
	required: BrandRequired
	disabled: BrandDisabled
}

/**
 * Estado inicial del reducer del formulario de `Brand`.
 * @type {State}
 */
export const initialBrandState: State = {
	formData: {
		id: undefined,
		name: '',
		categories: [],
		updatedAt: undefined
	},
	errors: {
		name: ''
	},
	disabled: {
		name: false
	},
	required: {
		name: true
	}
}

/**
 * @typedef {(
 *   { type: 'init'; payload: { formData: BrandParams } } |
 *   { type: 'reset'; payload: { formData: BrandParams } } |
 *   { type: 'name'; payload: { value: BrandParams['name'] } } |
 *   { type: 'addCategory'; payload: { value: string } } |
 *   { type: 'removeCategory'; payload: { value: string } }
 * )} Action
 * @description Tipos de acciones que puede manejar el reducer del formulario de `Brand`.
 */
export type Action =
	| { type: 'init'; payload: { formData: BrandParams } }
	| { type: 'reset'; payload: { formData: BrandParams } }
	| { type: 'name'; payload: { value: BrandParams['name'] } }
	| { type: 'addCategory'; payload: { value: string } }
	| { type: 'removeCategory'; payload: { value: string } }

/**
 * `brandFormReducer`
 * @function
 * @description Reducer para gestionar el estado del formulario de `Brand`.
 * Maneja diferentes acciones para inicializar, resetear, actualizar campos y gestionar categorías.
 * @param {State} state - El estado actual del reducer.
 * @param {Action} action - La acción a despachar.
 * @returns {State} El nuevo estado después de aplicar la acción.
 */
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
