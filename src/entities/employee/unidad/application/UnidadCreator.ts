import { Unidad } from '../domain/entity/Unidad'
import { UnidadId } from '../domain/value-object/UnidadId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type UnidadSaveRepository } from '../domain/repository/UnidadSaveRepository'
import { type UnidadParams } from '../domain/dto/Unidad.dto'

/**
 * Service class responsible for creating and updating Unidad entities.
 * It interacts with a UnidadSaveRepository to persist data and an EventManager to notify about operation status.
 */
export class UnidadCreator {
	/**
	 * Constructs a UnidadCreator instance.
	 * @param repository - The repository responsible for saving and updating Unidad data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		readonly repository: UnidadSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Creates a new Unidad or updates an existing one based on the provided parameters.
	 * It constructs a Unidad entity, converts it to primitives, and then uses the repository
	 * to save or update the data. Event notifications are sent for loading, success, and error states.
	 * @param params - The parameters for creating or updating a Unidad. If `params.id` is provided,
	 *                 an update operation is performed; otherwise, a new Unidad is created.
	 * @returns A Promise that resolves to the result of the save or update operation.
	 * @throws Error if the operation fails, with a message indicating the cause.
	 */
	async create(params: UnidadParams) {
		// Notify that the creation or update process has started
		this.events.notify({ type: 'loading' })
		try {
			const payload = Unidad.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new UnidadId(params.id).value, payload })
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
