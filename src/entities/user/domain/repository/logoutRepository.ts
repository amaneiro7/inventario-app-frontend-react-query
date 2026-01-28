/**
 * Abstract class for a repository that provides methods for user logout.
 */
export abstract class LogoutUserRepository {
	/**
	 * Abstract method to perform user logout.
	 * @returns A Promise that resolves when the logout operation is complete.
	 */
	abstract run(): Promise<void>
}
