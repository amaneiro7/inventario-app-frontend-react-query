import { type RefreshTokenRepository } from '../domain/repository/refreshTokenRepository'
import { type UserAuthDTO } from '../domain/dto/LoginAuth.dto'

/**
 * Service class responsible for refreshing user authentication tokens.
 * It interacts with a RefreshTokenRepository to obtain a new token.
 */
export class RefreshToken {
	/**
	 * Constructs a RefreshToken instance.
	 * @param refreshTokenRepository - The repository responsible for refreshing the authentication token.
	 */
	constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {}

	/**
	 * Executes the token refresh operation.
	 * @returns A Promise that resolves to a UserAuthDTO containing the new authentication details.
	 */
	async execute(): Promise<UserAuthDTO> {
		return await this.refreshTokenRepository.run()
	}
}