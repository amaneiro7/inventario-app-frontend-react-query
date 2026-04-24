import { ISPLinkName } from '../../domain/value-object/ISPLinkName'
import type { ISPLinkParams } from '../../domain/dto/ISPLink.dto'

export interface DefaultISPLink extends ISPLinkParams {
	updatedAt?: string
}

export interface ISPLinkErrors extends Record<string, string> {
	name: string
}
export interface ISPLinkRequired extends Record<string, boolean> {
	name: boolean
}
interface ISPLinkDisabled extends Record<string, boolean> {
	name: boolean
}

interface State {
	formData: DefaultISPLink
	errors: ISPLinkErrors
	required: ISPLinkRequired
	disabled: ISPLinkDisabled
}

export const initialISPLinkState: State = {
	formData: {
		id: undefined,
		name: '',
		updatedAt: undefined
	},
	errors: {
		name: ''
	},
	required: {
		name: true
	},
	disabled: {
		name: true
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultISPLink } }
	| { type: 'reset'; payload: { formData: DefaultISPLink } }
	| { type: 'name'; payload: { value: DefaultISPLink['name'] } }

export const ISPLinkFormReducer = (state: State, action: Action): State => {
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
					name: ISPLinkName.isValid(name) ? '' : ISPLinkName.invalidMessage(name)
				}
			}
		}
		default:
			return state
	}
}
