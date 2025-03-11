import { type CentroTrabajoParams } from '@/core/employee/centroTrabajo/domain/dto/CentroTrabajo.dto'
import { CentroTrabajoId } from '@/core/employee/centroTrabajo/domain/value-object/CentroTrabajoId'
import { CentroTrabajoName } from '@/core/employee/centroTrabajo/domain/value-object/CentroTrabajoName'

export type DefaultCentroTrabajo = CentroTrabajoParams & {
	updatedAt?: string
}

export interface CentroTrabajoErrors {
	id: string
	name: string
}
export interface CentroTrabajoRequired {
	id: boolean
	name: boolean
	centroCostoId: boolean
}
export interface CentroTrabajoDisabled {
	id: boolean
	name: boolean
	centroCostoId: boolean
}

export interface State {
	formData: DefaultCentroTrabajo
	errors: CentroTrabajoErrors
	required: CentroTrabajoRequired
	disabled: CentroTrabajoDisabled
}

export const initialCentroTrabajoState: State = {
	formData: {
		id: '1',
		name: '',
		centroCostoId: '',
		updatedAt: undefined
	},
	errors: {
		id: '',
		name: ''
	},
	required: {
		id: true,
		name: true,
		centroCostoId: true
	},
	disabled: {
		id: false,
		name: false,
		centroCostoId: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultCentroTrabajo } }
	| { type: 'reset'; payload: { formData: DefaultCentroTrabajo } }
	| { type: 'id'; payload: { value: DefaultCentroTrabajo['id'] } }
	| { type: 'name'; payload: { value: DefaultCentroTrabajo['name'] } }
	| { type: 'centroCostoId'; payload: { value: DefaultCentroTrabajo['centroCostoId'] } }

export const centroTrabajoFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData }
			}
		}

		case 'id': {
			const id = action.payload.value
			return {
				...state,
				formData: { ...state.formData, id },
				errors: {
					...state.errors,
					id: CentroTrabajoId.isValid(id) ? '' : CentroTrabajoId.invalidMessage()
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
					name: CentroTrabajoName.isValid(name) ? '' : CentroTrabajoName.invalidMessage()
				}
			}
		}
		case 'centroCostoId': {
			const centroCostoId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, centroCostoId }
			}
		}
		default:
			return state
	}
}
