import { UserAuthDTO, type LoginParams } from '../dto/LoginAuth.dto'

/**
 * Abstract class for a repository that provides methods for user login.
 */
export abstract class LoginUserRepository {
	/**
	 * Abstract method to perform user login.
	 * @param params - An object containing the user's email and password.
	 * @param params.email - The user's email address.
	 * @param params.password - The user's password.
	 * @returns A Promise that resolves to a UserAuthDTO upon successful login.
	 */
	abstract run({ userNameOrEmail, password }: LoginParams): Promise<UserAuthDTO>
}
