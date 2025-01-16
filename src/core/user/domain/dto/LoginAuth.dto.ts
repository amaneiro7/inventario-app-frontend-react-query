import { type LoginUserDto } from "./LoginUser.dto"

export type AccessToken = string

export type Message = string

export type UserAuthDTO = {
    user: LoginUserDto
    accessToken: AccessToken
    message: Message
}
export type LoginParams = {
    email: string
    password: string
}