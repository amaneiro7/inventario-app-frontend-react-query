import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../domain/value-objects/UserId'
import { DeleteUserRepository } from '../domain/repository/DeleteUserRepository'

/**
 * Service class responsible for deleting user accounts.
 * It interacts with a DeleteUserRepository to perform the deletion and an EventManager to notify about operation status.
 */
export class DeleteUser {
	/**
	 * Constructs a DeleteUser instance.
	 * @param deleteUserRepository - The repository responsible for deleting user data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		private readonly deleteUserRepository: DeleteUserRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Executes the user deletion operation.
	 * Event notifications are sent for loading, success, and error states.
	 * @param params - An object containing the ID of the user to delete.
	 * @param params.id - The primitive value of the UserId.
	 * @returns A Promise that resolves to the result of the deletion operation, or undefined if an error occurs.
	 * @throws Error if the repository operation encounters an issue.
	 */
	async execute({ id }: { id: Primitives<UserId> }) {
		try {
			this.events.notify({ type: 'loading', message: 'Procesando...' })

			return await this.deleteUserRepository.run({ id }).then(res => {
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