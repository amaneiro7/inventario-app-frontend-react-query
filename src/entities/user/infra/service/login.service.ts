import { fetching } from '@/shared/api/api'
import { type UserAuthDTO, type LoginParams } from '../../domain/dto/LoginAuth.dto'
import { type LoginUserRepository } from '../../domain/repository/loginUserRepository'

export class LoginService implements LoginUserRepository {
	async run({ userNameOrEmail, password }: LoginParams): Promise<UserAuthDTO> {
		return await fetching<UserAuthDTO>({
			method: 'POST',
			url: 'auth/login/local',
			data: { userNameOrEmail, password }
		})
	}
}
