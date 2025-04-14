import { type VicepresidenciaParams } from '../../domain/dto/Vicepresidencia.dto'
import { VicepresidenciaName } from '../../domain/value-object/VicepresidenciaName'

export type DefaultVicepresidencia = VicepresidenciaParams

export interface VicepresidenciaErrors {
	name: string
	vicepresidenciaEjecutivaId: string
}
export interface VicepresidenciaRequired {
	name: boolean
	vicepresidenciaEjecutivaId: boolean
}

export interface State {
	formData: DefaultVicepresidencia
	errors: VicepresidenciaErrors
	required: VicepresidenciaRequired
}

export const initialVicepresidenciaState: State = {
	formData: {
		id: undefined,
		name: '',
		vicepresidenciaEjecutivaId: ''
	},
	errors: {
		name: '',
		vicepresidenciaEjecutivaId: ''
	},
	required: {
		name: true,
		vicepresidenciaEjecutivaId: true
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultVicepresidencia } }
	| { type: 'reset'; payload: { formData: DefaultVicepresidencia } }
	| { type: 'name'; payload: { value: DefaultVicepresidencia['name'] } }
	| {
			type: 'vicepresidenciaEjecutivaId'
			payload: { value: DefaultVicepresidencia['vicepresidenciaEjecutivaId'] }
	  }

export const vicepresidenciaFormReducer = (state: State, action: Action): State => {
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
					name: VicepresidenciaName.isValid(name)
						? ''
						: VicepresidenciaName.invalidMessage()
				}
			}
		}
		case 'vicepresidenciaEjecutivaId': {
			const vicepresidenciaEjecutivaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, vicepresidenciaEjecutivaId }
			}
		}
		default:
			return state
	}
}
