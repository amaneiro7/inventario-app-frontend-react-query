import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../domain/value-objects/UserId'
import { ResetUserPasswordRepository } from '../domain/repository/ResetUserPasswordRepository'

/**
 * Service class responsible for resetting user passwords.
 * It interacts with a ResetUserPasswordRepository to perform the password reset and an EventManager to notify about operation status.
 */
export class ResetPassword {
	/**
	 * Constructs a ResetPassword instance.
	 * @param resetPasswordRepository - The repository responsible for resetting user passwords.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		private readonly resetPasswordRepository: ResetUserPasswordRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Executes the password reset operation for a given user ID.
	 * Event notifications are sent for loading, success, and error states.
	 * @param params - An object containing the ID of the user whose password is to be reset.
	 * @param params.id - The primitive value of the UserId.
	 * @returns A Promise that resolves to the result of the password reset operation, or undefined if an error occurs.
	 * @throws Error if the repository operation encounters an issue.
	 */
	async execute({ id }: { id: Primitives<UserId> }) {
		try {
			this.events.notify({ type: 'loading', message: 'Procesando...' })

			return await this.resetPasswordRepository.run({ id }).then(res => {
				this.events.notify({
					type: 'success',
					message: 'Opearción exitosa'
				})
				return res
			})
		} catch (error) {
			this.events.notify({ type: 'error', message: `${error}` })
		}
	}
}