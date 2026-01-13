import { User } from '../domain/entity/User'
import { UserId } from '../domain/value-objects/UserId'
import { type UserParams } from '../domain/dto/LoginUser.dto'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type UserSaveRepository } from '../domain/repository/UserSaveRepository'

/**
 * Service class responsible for creating and updating User entities.
 * It interacts with a UserSaveRepository to persist data and an EventManager to notify about operation status.
 */
export class UserCreator {
	/**
	 * Constructs a UserCreator instance.
	 * @param repository - The repository responsible for saving and updating user data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		readonly repository: UserSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Creates a new user or updates an existing one based on the provided parameters.
	 * It constructs a User entity, converts it to primitives, and then uses the repository
	 * to save or update the data. Event notifications are sent for loading, success, and error states.
	 * @param params - The parameters for creating or updating a user. If `params.id` is provided,
	 *                 an update operation is performed; otherwise, a new user is created.
	 * @returns A Promise that resolves to the result of the save or update operation.
	 * @throws Error if the operation fails, with a message indicating the cause.
	 */
	async create(params: UserParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = User.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new UserId(params.id).value, payload })
				: await this.repository.save({ payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			throw error
		}
	}
}
