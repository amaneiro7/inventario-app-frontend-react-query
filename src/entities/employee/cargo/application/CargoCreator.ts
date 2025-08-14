import { Cargo } from '../domain/entity/Cargo'
import { CargoId } from '../domain/value-object/CargoId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type CargoSaveRepository } from '../domain/repository/CargoSaveRepository'
import { type CargoParams } from '../domain/dto/Cargo.dto'

/**
 * Service class responsible for creating and updating Cargo entities.
 * It interacts with a CargoSaveRepository to persist data and an EventManager to notify about operation status.
 */
export class CargoCreator {
	/**
	 * Constructs a CargoCreator instance.
	 * @param repository - The repository responsible for saving and updating cargo data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		readonly repository: CargoSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Creates a new cargo or updates an existing one based on the provided parameters.
	 * It constructs a Cargo entity, converts it to primitives, and then uses the repository
	 * to save or update the data. Event notifications are sent for loading, success, and error states.
	 * @param params - The parameters for creating or updating a cargo. If `params.id` is provided,
	 *                 an update operation is performed; otherwise, a new cargo is created.
	 * @returns A Promise that resolves to the result of the save or update operation.
	 * @throws Error if the operation fails, with a message indicating the cause.
	 */
	async create(params: CargoParams) {
		// Notify that the creation or update process has started
		this.events.notify({ type: 'loading' })
		try {
			const payload = Cargo.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new CargoId(params.id).value, payload })
				: await this.repository.save({ payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notify the error and throw an exception.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			return { message: errorMessage }
		}
	}
}
