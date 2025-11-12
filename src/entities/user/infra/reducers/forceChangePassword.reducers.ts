interface DefaultProps {
	formData: FormData
	errors: Errors
	valid: Valid
	toggleInputs: ToggleInputs
	isSubmitting: boolean
}

export interface FormData {
	newPassword: string
	reTypePassword: string
}
export interface Errors {
	newPassword: string
	reTypePassword: string
}
export interface Valid {
	newPassword: boolean
	reTypePassword: boolean
}
export interface ToggleInputs {
	newPassword: boolean
	reTypePassword: boolean
}

export const forceChangePasswordInitialState: DefaultProps = {
	formData: {
		newPassword: '',
		reTypePassword: ''
	},
	errors: {
		newPassword: '',
		reTypePassword: ''
	},
	valid: {
		newPassword: false,
		reTypePassword: false
	},
	toggleInputs: {
		newPassword: false,
		reTypePassword: false
	},
	isSubmitting: false
}

type Action =
	| { type: 'reset' }
	| {
			type: 'toggle_inputs'
			payload: { field: 'newPassword' | 'reTypePassword' }
	  }
	| { type: 'start_submit' }
	| { type: 'end_submit' }
	| { type: 'update_field'; payload: { field: string; value: string } }
	| { type: 'errors'; payload: { errors: Errors } }
	| { type: 'valid'; payload: { valid: Valid } }

export const forceChangePasswordReducer = (state: DefaultProps, action: Action): DefaultProps => {
	switch (action.type) {
		case 'reset':
			return { ...forceChangePasswordInitialState }
		case 'start_submit':
			return { ...state, isSubmitting: true }
		case 'end_submit':
			return { ...state, isSubmitting: false }
		case 'toggle_inputs': {
			const { field } = action.payload
			return {
				...state,
				toggleInputs: {
					...state.toggleInputs,
					[field]: !state.toggleInputs[field]
				}
			}
		}
		case 'update_field': {
			const { value, field } = action.payload
			return {
				...state,
				formData: {
					...state.formData,
					[field]: value
				}
			}
		}
		case 'errors': {
			const { errors } = action.payload
			return {
				...state,
				errors: {
					...state.errors,
					...errors
				}
			}
		}
		case 'valid': {
			const { valid } = action.payload
			return {
				...state,
				valid: {
					...state.valid,
					...valid
				}
			}
		}
		default:
			return state
	}
}
