import { type DepartamentoDto, type DepartamentoParams } from '../../domain/dto/Departamento.dto'
import { DepartamentoName } from '../../domain/value-object/DepartamentoName'

/**
 * Represents the default structure for a departamento's form data.
 */
export type DefaultDepartamento = DepartamentoParams & {
	vicepresidenciaEjecutivaId: DepartamentoDto['vicepresidencia']['vicepresidenciaEjecutivaId']
	directivaId: DepartamentoDto['vicepresidencia']['vicepresidenciaEjecutiva']['directivaId']
	updatedAt?: string
}

/**
 * Defines the structure for validation errors in the departamento form.
 */
export interface DepartamentoErrors extends Record<string, string> {
	name: string
}

/**
 * Defines which fields in the departamento form are required based on current state.
 */
export interface DepartamentoRequired extends Record<string, boolean> {
	name: boolean
	directivaId: boolean
	vicepresidenciaEjecutivaId: boolean
	vicepresidenciaId: boolean
	cargos: boolean
}

/**
 * Defines which fields in the departamento form are disabled based on current state.
 */
export interface DepartamentoDisabled extends Record<string, boolean> {
	name: boolean
	directivaId: boolean
	vicepresidenciaEjecutivaId: boolean
	vicepresidenciaId: boolean
	cargos: boolean
}

/**
 * Represents the entire state managed by the departamento form reducer.
 */
export interface State {
	formData: DefaultDepartamento
	errors: DepartamentoErrors
	required: DepartamentoRequired
	disabled: DepartamentoDisabled
}

/**
 * The initial state for the departamento form reducer.
 */
export const initialDepartamentoState: State = {
	formData: {
		id: '',
		directivaId: '',
		vicepresidenciaEjecutivaId: '',
		vicepresidenciaId: '',
		name: '',
		cargos: [],
		updatedAt: undefined
	},
	errors: {
		name: ''
	},
	required: {
		name: true,
		directivaId: true,
		vicepresidenciaEjecutivaId: true,
		vicepresidenciaId: true,
		cargos: false
	},
	disabled: {
		directivaId: false,
		vicepresidenciaEjecutivaId: true,
		vicepresidenciaId: true,
		name: false,
		cargos: false
	}
}

/**
 * Defines the possible actions that can be dispatched to the departamento form reducer.
 */
export type Action =
	| { type: 'init'; payload: { formData: DefaultDepartamento } }
	| { type: 'reset'; payload: { formData: DefaultDepartamento } }
	| { type: 'directivaId'; payload: { value: DefaultDepartamento['directivaId'] } }
	| {
			type: 'vicepresidenciaEjecutivaId'
			payload: { value: DefaultDepartamento['vicepresidenciaEjecutivaId'] }
	  }
	| { type: 'vicepresidenciaId'; payload: { value: DefaultDepartamento['vicepresidenciaId'] } }
	| { type: 'addCargo'; payload: { value: string } }
	| { type: 'removeCargo'; payload: { value: string } }
	| { type: 'name'; payload: { value: DefaultDepartamento['name'] } }

/**
 * Reducer function for managing the state of the departamento form.
 * It handles various actions to update form data, errors, required fields, and disabled fields.
 * @param state - The current state of the form.
 * @param action - The dispatched action.
 * @returns The new state after applying the action.
 */
export const departamentoFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		/**
		 * Initializes or resets the form data. Also updates disabled states for dependent fields.
		 */
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				disabled: {
					...state.disabled,
					vicepresidenciaEjecutivaId: !action.payload.formData.directivaId,
					vicepresidenciaId: !action.payload.formData.vicepresidenciaEjecutivaId
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
					name: DepartamentoName.isValid(name) ? '' : DepartamentoName.invalidMessage()
				}
			}
		}
		/**
		 * Updates the directivaId field and updates disabled states for dependent fields.
		 */
		case 'directivaId': {
			const directivaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, directivaId },
				disabled: {
					...state.disabled,
					vicepresidenciaEjecutivaId: !directivaId,
					vicepresidenciaId: !directivaId
				}
			}
		}
		/**
		 * Updates the vicepresidenciaEjecutivaId field and updates disabled states for dependent fields.
		 */
		case 'vicepresidenciaEjecutivaId': {
			const vicepresidenciaEjecutivaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, vicepresidenciaEjecutivaId },
				disabled: { ...state.disabled, vicepresidenciaId: !vicepresidenciaEjecutivaId }
			}
		}
		/**
		 * Updates the vicepresidenciaId field.
		 */
		case 'vicepresidenciaId': {
			const vicepresidenciaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, vicepresidenciaId }
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
