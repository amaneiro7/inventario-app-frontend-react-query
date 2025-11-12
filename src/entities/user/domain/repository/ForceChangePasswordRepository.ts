import { type ChangeExpiredPasswordParams } from '../dto/ChangePasword.dto'

/**
 * Abstract class for a repository that provides methods for changing a user's password.
 */
export abstract class ForceChangePasswordRepository {
	/**
	 * Abstract method to change a user's password.
	 * @param params - An object containing the old password, new password, and re-typed new password.
	 * @param params.password - The user's current password.
	 * @param params.newPassword - The new password to set.
	 * @param params.reTypePassword - The re-typed new password for confirmation.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	abstract run({
		tempToken,
		newPassword,
		reTypePassword
	}: ChangeExpiredPasswordParams): Promise<{ message: string }>
}
