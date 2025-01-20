import { fetching } from '@/api/api'
import { type UserAuthDTO, type LoginParams } from '../domain/dto/LoginAuth.dto'
import { type LoginUserRepository } from '../domain/repository/loginUserRepository'

export class LoginService implements LoginUserRepository {
  async run({ email, password }: LoginParams): Promise<UserAuthDTO> {
    return await fetching<UserAuthDTO>({
      method: 'POST',
      url: 'auth/login/local',
      data: { email, password }
    })
  }
}
