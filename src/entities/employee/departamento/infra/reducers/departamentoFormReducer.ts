import { type DepartamentoDto, type DepartamentoParams } from '../../domain/dto/Departamento.dto'
import { DepartamentoName } from '../../domain/value-object/DepartamentoName'

export type DefaultDepartamento = DepartamentoParams & {
	vicepresidenciaEjecutivaId: DepartamentoDto['vicepresidencia']['vicepresidenciaEjecutivaId']
	directivaId: DepartamentoDto['vicepresidencia']['vicepresidenciaEjecutiva']['directivaId']
	updatedAt?: string
}

export interface DepartamentoErrors {
	name: string
}
export interface DepartamentoRequired {
	name: boolean
	directivaId: boolean
	vicepresidenciaEjecutivaId: boolean
	vicepresidenciaId: boolean
	cargos: boolean
}
export interface DepartamentoDisabled {
	name: boolean
	directivaId: boolean
	vicepresidenciaEjecutivaId: boolean
	vicepresidenciaId: boolean
	cargos: boolean
}

export interface State {
	formData: DefaultDepartamento
	errors: DepartamentoErrors
	required: DepartamentoRequired
	disabled: DepartamentoDisabled
}

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

export const departamentoFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
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
		case 'vicepresidenciaEjecutivaId': {
			const vicepresidenciaEjecutivaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, vicepresidenciaEjecutivaId },
				disabled: { ...state.disabled, vicepresidenciaId: !vicepresidenciaEjecutivaId }
			}
		}
		case 'vicepresidenciaId': {
			const vicepresidenciaId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, vicepresidenciaId }
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
