import { type UserAuthDTO } from '../dto/LoginAuth.dto'

/**
 * Abstract class for a repository that provides methods for refreshing authentication tokens.
 */
export abstract class RefreshTokenRepository {
	/**
	 * Abstract method to refresh the authentication token.
	 * @returns A Promise that resolves to a UserAuthDTO containing the new authentication details.
	 */
	abstract run(): Promise<UserAuthDTO>
}