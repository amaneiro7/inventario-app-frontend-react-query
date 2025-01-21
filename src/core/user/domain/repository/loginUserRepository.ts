import { UserAuthDTO, type LoginParams } from '../dto/LoginAuth.dto'
export abstract class LoginUserRepository {
	abstract run({ email, password }: LoginParams): Promise<UserAuthDTO>
}
