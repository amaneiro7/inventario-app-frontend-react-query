export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    roleId: number
    role: {
        id: number;
        name: string
    }
}

export type AccessToken = string

export type Message = string

export type UserAuthDTO = {
    user: User
    accessToken: AccessToken
    message: Message
}
export type LoginParams = {
    email: string
    password: string
}