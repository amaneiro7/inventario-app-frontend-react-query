import { UserEmail } from '../../domain/value-objects/UserEmail'
import { UserLastName } from '../../domain/value-objects/UserLastName'
import { UserName } from '../../domain/value-objects/UserName'

export interface DefaultUsers {
	id?: string
	name: string
	lastName: string
	email: string
	roleId: string
}

export interface UserErrors {
	name: string
	lastName: string
	email: string
	roleId: string
}
export interface UserRequired {
	name: boolean
	lastName: boolean
	email: boolean
	roleId: boolean
}

export interface UserDisabled {
	name: boolean
	lastName: boolean
	email: boolean
	roleId: boolean
}

export interface State {
	formData: DefaultUsers
	errors: UserErrors
	required: UserRequired
	disabled: UserDisabled
}

export const initialUserState: State = {
	formData: {
		id: undefined,
		name: '',
		lastName: '',
		email: '',
		roleId: ''
	},
	errors: {
		name: '',
		lastName: '',
		email: '',
		roleId: ''
	},
	required: {
		name: true,
		lastName: true,
		email: true,
		roleId: true
	},
	disabled: {
		name: false,
		lastName: false,
		email: false,
		roleId: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultUsers } }
	| { type: 'reset'; payload: { formData: DefaultUsers } }
	| { type: 'name'; payload: { value: DefaultUsers['name'] } }
	| { type: 'lastName'; payload: { value: DefaultUsers['lastName'] } }
	| { type: 'email'; payload: { value: DefaultUsers['email'] } }
	| { type: 'roleId'; payload: { value: DefaultUsers['roleId'] } }

export const userFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				disabled: {
					...initialUserState.disabled
				},
				required: {
					...initialUserState.required
				},
				errors: {
					...initialUserState.errors
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
					name: UserName.isValid(name) ? '' : UserName.invalidMessage()
				}
			}
		}
		case 'lastName': {
			const lastName = action.payload.value
			return {
				...state,
				formData: { ...state.formData, lastName },
				errors: {
					...state.errors,
					lastName: UserLastName.isValid(lastName) ? '' : UserLastName.invalidMessage()
				}
			}
		}
		case 'email': {
			const email = action.payload.value
			return {
				...state,
				formData: { ...state.formData, email },
				errors: {
					...state.errors,
					email: UserEmail.isValid(email) ? '' : UserEmail.invalidMessage(email)
				}
			}
		}
		case 'roleId': {
			const roleId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, roleId }
			}
		}

		default:
			return state
	}
}
