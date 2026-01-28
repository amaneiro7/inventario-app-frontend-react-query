import { type LogoutUserRepository } from '../domain/repository/logoutRepository'

/**
 * Service class responsible for handling user logout operations.
 * It interacts with a LogoutUserRepository to perform the logout.
 */
export class Logout {
	/**
	 * Constructs a Logout instance.
	 * @param logoutUserRepository - The repository responsible for user logout.
	 */
	constructor(private readonly logoutUserRepository: LogoutUserRepository) {}

	/**
	 * Executes the user logout operation.
	 * @returns A Promise that resolves when the logout operation is complete.
	 */
	async execute() {
		return await this.logoutUserRepository.run()
	}
}
