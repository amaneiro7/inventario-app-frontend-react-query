import { LoginParams, UserAuthDTO } from "../types/user"
import { fetching } from "./api"

export const loginService = async ({ email, password }: LoginParams): Promise<UserAuthDTO> => {
    return await fetching<UserAuthDTO>({
        method: 'POST',
        url: 'auth/login/local',
        data: { email, password }
    })
}