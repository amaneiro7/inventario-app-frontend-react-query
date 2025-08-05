import { type LoginUserDto } from './LoginUser.dto'

/**
 * Represents an access token for authentication.
 */
export type AccessToken = string

/**
 * Represents a generic message string.
 */
export type Message = string

/**
 * Represents the data transfer object for user authentication, including user details, access token, and a message.
 */
export interface UserAuthDTO {
	user: LoginUserDto
	accessToken: AccessToken
	message: Message
}

/**
 * Defines the parameters required for user login.
 */
export interface LoginParams {
	email: string
	password: string
}