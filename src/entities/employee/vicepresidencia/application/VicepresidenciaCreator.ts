import { Vicepresidencia } from '../domain/entity/Vicepresidencia'
import { VicepresidenciaId } from '../domain/value-object/VicepresidenciaId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type VicepresidenciaSaveRepository } from '../domain/repository/VicepresidenciaSaveRepository'
import { type VicepresidenciaParams } from '../domain/dto/Vicepresidencia.dto'

/**
 * Service class responsible for creating and updating Vicepresidencia entities.
 * It interacts with a VicepresidenciaSaveRepository to persist data and an EventManager to notify about operation status.
 */
export class VicepresidenciaCreator {
	/**
	 * Constructs a VicepresidenciaCreator instance.
	 * @param repository - The repository responsible for saving and updating vicepresidencia data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		readonly repository: VicepresidenciaSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Creates a new vicepresidencia or updates an existing one based on the provided parameters.
	 * It constructs a Vicepresidencia entity, converts it to primitives, and then uses the repository
	 * to save or update the data. Event notifications are sent for loading, success, and error states.
	 * @param params - The parameters for creating or updating a vicepresidencia. If `params.id` is provided,
	 *                 an update operation is performed; otherwise, a new vicepresidencia is created.
	 * @returns A Promise that resolves to the result of the save or update operation.
	 * @throws Error if the operation fails, with a message indicating the cause.
	 */
	async create(params: VicepresidenciaParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Vicepresidencia.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({
						id: new VicepresidenciaId(params.id).value,
						payload
					})
				: await this.repository.save({ payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			return { message: errorMessage }
		}
	}
}
