import { fetching } from "../../../api/api"
import { UserAuthDTO, type LoginParams } from "../domain/dto/LoginAuth.dto"
import { type LoginUserRepository } from "../domain/repository/loginUserRepository"

export class LoginService implements LoginUserRepository {
    async run({ email, password }: LoginParams): Promise<UserAuthDTO> {

        console.log('Login Service Infra')
        return await fetching<UserAuthDTO>({
            method: 'POST',
            url: 'auth/login/local',
            data: { email, password }
        })
    }

}