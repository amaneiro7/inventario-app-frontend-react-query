import {
	type VicepresidenciaDto,
	type VicepresidenciaParams
} from '../../domain/dto/Vicepresidencia.dto'
import { VicepresidenciaName } from '../../domain/value-object/VicepresidenciaName'

export type DefaultVicepresidencia = VicepresidenciaParams & {
	directivaId: VicepresidenciaDto['vicepresidenciaEjecutiva']['directivaId']
	updatedAt?: string
}

export interface VicepresidenciaErrors {
	name: string
}
export interface VicepresidenciaRequired {
	name: boolean
	directivaId: boolean
	vicepresidenciaEjecutivaId: boolean
	cargos: boolean
}
export interface VicepresidenciaDisabled {
	name: boolean
	directivaId: boolean
	vicepresidenciaEjecutivaId: boolean
	cargos: boolean
}

export interface State {
	formData: DefaultVicepresidencia
	errors: VicepresidenciaErrors
	required: VicepresidenciaRequired
	disabled: VicepresidenciaDisabled
}

export const initialVicepresidenciaState: State = {
	formData: {
		id: undefined,
		name: '',
		directivaId: '',
		vicepresidenciaEjecutivaId: '',
		cargos: [],
		updatedAt: undefined
	},
	errors: {
		name: ''
	},
	required: {
		name: true,
		vicepresidenciaEjecutivaId: true,
		directivaId: true,
		cargos: false
	},
	disabled: {
		directivaId: false,
		vicepresidenciaEjecutivaId: true,
		name: false,
		cargos: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultVicepresidencia } }
	| { type: 'reset'; payload: { formData: DefaultVicepresidencia } }
	| { type: 'name'; payload: { value: DefaultVicepresidencia['name'] } }
	| { type: 'directivaId'; payload: { value: DefaultVicepresidencia['directivaId'] } }
	| {
			type: 'vicepresidenciaEjecutivaId'
			payload: { value: DefaultVicepresidencia['vicepresidenciaEjecutivaId'] }
	  }
	| { type: 'addCargo'; payload: { value: string } }
	| { type: 'removeCargo'; payload: { value: string } }

export const vicepresidenciaFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				disabled: {
					...state.disabled,
					vicepresidenciaEjecutivaId: !action.payload.formData.directivaId
				}
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
		case 'directivaId': {
			const directivaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, directivaId },
				disabled: {
					...state.disabled,
					vicepresidenciaEjecutivaId: !directivaId
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
