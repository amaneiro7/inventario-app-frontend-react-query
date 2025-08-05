import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { ChangePasswordRepository } from '../domain/repository/changePasswordRepository'
import { ChangePassordParams } from '../domain/dto/ChangePasword.dto'

/**
 * Service class responsible for handling user password changes.
 * It interacts with a ChangePasswordRepository to update the password and an EventManager to notify about operation status.
 */
export class ChangePassword {
	/**
	 * Constructs a ChangePassword instance.
	 * @param changePasswordRepository - The repository responsible for changing the user's password.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		private readonly changePasswordRepository: ChangePasswordRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Executes the password change operation.
	 * It performs validation checks (new password matching, new password different from old) before attempting to change the password.
	 * Event notifications are sent for loading, success, and error states.
	 * @param params - An object containing the old password, new password, and re-typed new password.
	 * @param params.password - The user's current password.
	 * @param params.newPassword - The new password to set.
	 * @param params.reTypePassword - The re-typed new password for confirmation.
	 * @returns A Promise that resolves to the result of the password change operation, or undefined if an error occurs.
	 * @throws Error if validation fails or the repository operation encounters an issue.
	 */
	async execute({ password, newPassword, reTypePassword }: ChangePassordParams) {
		try {
			this.events.notify({ type: 'loading', message: 'Procesando...' })
			if (newPassword !== reTypePassword) {
				throw new Error('Las contraseñas no coinciden')
			}

			if (password === newPassword) {
				throw new Error('La nueva contraseña debe ser diferente a la actual')
			}
			return await this.changePasswordRepository
				.run({ password, newPassword, reTypePassword })
				.then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
		} catch (error) {
			this.events.notify({ type: 'error', message: `${error}` })
		}
	}
}