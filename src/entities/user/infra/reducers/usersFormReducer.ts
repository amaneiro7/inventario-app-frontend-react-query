import { type LoginUserDto } from '../../domain/dto/LoginUser.dto'
import { UserStatusEnum } from '../../domain/value-objects/UserStatus'

export interface DefaultUsers {
	id?: string
	userName: string
	name: string
	lastName: string
	email: string
	status: LoginUserDto['status']
	roleId: string
	role?: LoginUserDto['role']
	employeeId?: LoginUserDto['employeeId']
	lastLoginAt?: Date | null
	lastLoginIp?: string | null
	passwordChangeAt?: Date | null
	updatedAt?: string
}

export interface State {
	formData: DefaultUsers
}

export const initialUserState: State = {
	formData: {
		id: undefined,
		userName: '',
		name: '',
		lastName: '',
		email: '',
		roleId: '',
		status: UserStatusEnum.ACTIVE
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultUsers } }
	| { type: 'reset'; payload: { formData: DefaultUsers } }
	| { type: 'name'; payload: { value: DefaultUsers['name'] } }
	| { type: 'lastName'; payload: { value: DefaultUsers['lastName'] } }
	| { type: 'email'; payload: { value: DefaultUsers['email'] } }
	| { type: 'roleId'; payload: { value: DefaultUsers['roleId'] } }
	| { type: 'employeeId'; payload: { value: DefaultUsers['employeeId'] } }

export const userFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData }
			}
		}
		case 'roleId': {
			const roleId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, roleId }
			}
		}
		case 'employeeId': {
			const employeeId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, employeeId }
			}
		}

		default:
			return state
	}
}
