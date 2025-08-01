import { type CentroCostoParams } from '@/entities/employee/centroCosto/domain/dto/CentroCosto.dto'
import { CentroCostoId } from '@/entities/employee/centroCosto/domain/value-object/CentroCostoId'
import { CentroCostoName } from '@/entities/employee/centroCosto/domain/value-object/CentroCostoName'

export type DefaultCentroCosto = CentroCostoParams & {
	updatedAt?: string
}

export interface CentroCostoErrors {
	id: string
	name: string
}
export interface CentroCostoRequired {
	id: boolean
	name: boolean
}
export interface CentroCostoDisabled {
	id: boolean
	name: boolean
}

export interface State {
	formData: DefaultCentroCosto
	errors: CentroCostoErrors
	required: CentroCostoRequired
	disabled: CentroCostoDisabled
}

export const initialCentroCostoState: State = {
	formData: {
		id: '1',
		name: ''
	},
	errors: {
		id: '',
		name: ''
	},
	required: {
		id: true,
		name: true
	},
	disabled: {
		id: false,
		name: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultCentroCosto } }
	| { type: 'reset'; payload: { formData: DefaultCentroCosto } }
	| { type: 'id'; payload: { value: DefaultCentroCosto['id'] } }
	| { type: 'name'; payload: { value: DefaultCentroCosto['name'] } }

export const centroCostoFormReducer = (state: State, action: Action): State => {
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
					id: CentroCostoId.isValid(id) ? '' : CentroCostoId.invalidMessage()
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
					name: CentroCostoName.isValid(name) ? '' : CentroCostoName.invalidMessage()
				}
			}
		}
		default:
			return state
	}
}
