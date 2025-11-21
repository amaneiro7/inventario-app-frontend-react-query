import { type LoginUserDto } from './LoginUser.dto'
export type AccessToken = string
export type Message = string

export interface UserAuthDTO {
	user: LoginUserDto
	accessToken: AccessToken
	message: Message
	permissions: string[]
}

export interface LoginParams {
	userNameOrEmail: string
	password: string
}
