import { type UnidadDto, type UnidadParams } from '../../domain/dto/Unidad.dto'
import { CodigoInterno } from '../../domain/value-object/CodigoInterno'
import { Level } from '../../domain/value-object/Level'
import { UnidadName } from '../../domain/value-object/UnidadName'

/**
 * Represents the default structure for a Unidad's form data.
 */
export type DefaultUnidad = UnidadParams & {
	full_chain?: UnidadDto['full_chain'] | null
	updatedAt?: string
}

/**
 * Defines the structure for validation errors in the Unidad form.
 */
export interface UnidadErrors extends Record<string, string> {
	name: UnidadDto['name']
}

/**
 * Defines which fields in the Unidad form are required based on current state.
 */
export interface UnidadRequired extends Record<string, boolean> {
	name: boolean
	cargos: boolean
	parentId: boolean
	centroDeCosto: boolean
	codigoInterno: boolean
	isUnitActive: boolean
}
export interface UnidadDisabled extends Record<string, boolean> {
	name: boolean
	cargos: boolean
	parentId: boolean
	centroDeCosto: boolean
	codigoInterno: boolean
	isUnitActive: boolean
}

interface State {
	formData: DefaultUnidad
	errors: UnidadErrors
	required: UnidadRequired
	disabled: UnidadDisabled
}

/**
 * The initial state for the Unidad form reducer.
 */
export const initialUnidadState: State = {
	formData: {
		id: undefined,
		name: '',
		level: 1,
		centroDeCosto: '',
		codigoInterno: '',
		isUnitActive: true,
		parentId: '',
		cargos: [],
		updatedAt: undefined
	},
	errors: {
		name: ''
	},
	required: {
		name: true,
		centroDeCosto: false,
		codigoInterno: true,
		isUnitActive: true,
		parentId: true,
		cargos: false
	},
	disabled: {
		name: false,
		centroDeCosto: false,
		codigoInterno: false,
		isUnitActive: false,
		parentId: true,
		cargos: false
	}
}

/**
 * Defines the possible actions that can be dispatched to the Unidad form reducer.
 */
export type Action =
	| { type: 'init'; payload: { formData: DefaultUnidad } }
	| { type: 'reset'; payload: { formData: DefaultUnidad } }
	| { type: 'name'; payload: { value: DefaultUnidad['name'] } }
	| { type: 'level'; payload: { value: DefaultUnidad['level'] } }
	| { type: 'centroDeCosto'; payload: { value: DefaultUnidad['centroDeCosto'] } }
	| { type: 'codigoInterno'; payload: { value: DefaultUnidad['codigoInterno'] } }
	| { type: 'isUnitActive'; payload: { value: DefaultUnidad['isUnitActive'] } }
	| {
			type: 'parentId'
			payload: { value: DefaultUnidad['parentId']; full_chain?: UnidadDto['full_chain'] }
	  }
	| { type: 'addCargo'; payload: { value: string } }
	| { type: 'removeCargo'; payload: { value: string } }

/**
 * Reducer function for managing the state of the Unidad form.
 * It handles various actions to update form data, errors, and required fields.
 * @param state - The current state of the form.
 * @param action - The dispatched action.
 * @returns The new state after applying the action.
 */
export const unidadFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		/**
		 * Initializes or resets the form data.
		 */
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				disabled: {
					...state.disabled,
					parentId: action.payload.formData.level === 1
				}
			}
		}

		/**
		 * Updates the name field and validates it.
		 */
		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name },
				errors: {
					...state.errors,
					name: UnidadName.isValid(name) ? '' : UnidadName.invalidMessage()
				}
			}
		}
		case 'level': {
			const level = Number(action.payload.value)
			const parentId = level === 1 ? '' : state.formData.parentId
			return {
				...state,
				formData: { ...state.formData, level, parentId },
				errors: {
					...state.errors,
					centroDeCosto: Level.isValid(level) ? '' : Level.invalidMessage()
				},
				disabled: {
					...state.disabled,
					parentId: level === 1
				}
			}
		}
		case 'centroDeCosto': {
			const centroDeCosto = action.payload.value
			return {
				...state,
				formData: { ...state.formData, centroDeCosto }
			}
		}
		case 'codigoInterno': {
			const codigoInterno = action.payload.value
			return {
				...state,
				formData: { ...state.formData, codigoInterno },
				errors: {
					...state.errors,
					codigoInterno: CodigoInterno.isValid({ value: codigoInterno })
						? ''
						: CodigoInterno.invalidMessage()
				}
			}
		}
		case 'isUnitActive': {
			const isUnitActive = action.payload.value
			return {
				...state,
				formData: { ...state.formData, isUnitActive }
			}
		}
		case 'parentId': {
			const parentId = action.payload.value
			const full_chain = action.payload.full_chain

			return {
				...state,
				formData: { ...state.formData, parentId, full_chain }
			}
		}

		/**
		 * Adds a new cargo ID to the form data.
		 */
		case 'addCargo': {
			const cargos = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					cargos: [...state.formData.cargos, cargos]
				}
			}
		}
		/**
		 * Removes a cargo ID from the form data.
		 */
		case 'removeCargo': {
			const cargos = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					cargos: state.formData.cargos.filter(c => c !== cargos)
				}
			}
		}
		default:
			return state
	}
}
