import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../domain/value-objects/UserId'
import { type UnlockAccountRepository } from '../domain/repository/UnlockAccountRepository'

/**
 * Service class responsible for resetting user passwords.
 * It interacts with a ResetUserPasswordRepository to perform the password reset and an EventManager to notify about operation status.
 */
export class UnlockAccount {
	/**
	 * Constructs a ResetPassword instance.
	 * @param unlockAccountRepository - The repository responsible for resetting user passwords.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		private readonly unlockAccountRepository: UnlockAccountRepository,
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

			return await this.unlockAccountRepository.run({ id }).then(res => {
				this.events.notify({
					type: 'success',
					message: res.message ?? 'Operación realizada con éxito'
				})
				return res
			})
		} catch (error) {
			this.events.notify({ type: 'error', message: `${error}` })
		}
	}
}
