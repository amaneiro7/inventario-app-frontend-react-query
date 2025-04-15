import { type VicepresidenciaEjecutivaParams } from '../../domain/dto/VicepresidenciaEjecutiva.dto'
import { VicepresidenciaEjecutivaName } from '../../domain/value-object/VicepresidenciaEjecutivaName'

export type DefaultVicepresidenciaEjecutiva = VicepresidenciaEjecutivaParams & {
	updatedAt?: string
}

export interface VicepresidenciaEjecutivaErrors {
	name: string
	directivaId: string
}
export interface VicepresidenciaEjecutivaRequired {
	name: boolean
	directivaId: boolean
	cargos: boolean
}

export interface State {
	formData: DefaultVicepresidenciaEjecutiva
	errors: VicepresidenciaEjecutivaErrors
	required: VicepresidenciaEjecutivaRequired
}

export const initialVicepresidenciaEjecutivaState: State = {
	formData: {
		id: undefined,
		name: '',
		directivaId: '',
		cargos: [],
		updatedAt: undefined
	},
	errors: {
		name: '',
		directivaId: ''
	},
	required: {
		name: true,
		directivaId: true,
		cargos: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultVicepresidenciaEjecutiva } }
	| { type: 'reset'; payload: { formData: DefaultVicepresidenciaEjecutiva } }
	| { type: 'name'; payload: { value: DefaultVicepresidenciaEjecutiva['name'] } }
	| { type: 'directivaId'; payload: { value: DefaultVicepresidenciaEjecutiva['directivaId'] } }
	| { type: 'addCargo'; payload: { value: string } }
	| { type: 'removeCargo'; payload: { value: string } }

export const vicepresidenciaEjecutivaFormReducer = (state: State, action: Action): State => {
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
					name: VicepresidenciaEjecutivaName.isValid(name)
						? ''
						: VicepresidenciaEjecutivaName.invalidMessage()
				}
			}
		}
		case 'directivaId': {
			const directivaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, directivaId }
			}
		}
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
