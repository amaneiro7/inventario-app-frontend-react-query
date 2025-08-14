import { VicepresidenciaEjecutiva } from '../domain/entity/VicepresidenciaEjecutiva'
import { VicepresidenciaEjecutivaId } from '../domain/value-object/VicepresidenciaEjecutivaId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type VicepresidenciaEjecutivaSaveRepository } from '../domain/repository/VicepresidenciaEjecutivaSaveRepository'
import { type VicepresidenciaEjecutivaParams } from '../domain/dto/VicepresidenciaEjecutiva.dto'

/**
 * Service class responsible for creating and updating VicepresidenciaEjecutiva entities.
 * It interacts with a VicepresidenciaEjecutivaSaveRepository to persist data and an EventManager to notify about operation status.
 */
export class VicepresidenciaEjecutivaCreator {
	/**
	 * Constructs a VicepresidenciaEjecutivaCreator instance.
	 * @param repository - The repository responsible for saving and updating vicepresidencia ejecutiva data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		readonly repository: VicepresidenciaEjecutivaSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Creates a new vicepresidencia ejecutiva or updates an existing one based on the provided parameters.
	 * It constructs a VicepresidenciaEjecutiva entity, converts it to primitives, and then uses the repository
	 * to save or update the data. Event notifications are sent for loading, success, and error states.
	 * @param params - The parameters for creating or updating a vicepresidencia ejecutiva. If `params.id` is provided,
	 *                 an update operation is performed; otherwise, a new vicepresidencia ejecutiva is created.
	 * @returns A Promise that resolves to the result of the save or update operation.
	 * @throws Error if the operation fails, with a message indicating the cause.
	 */
	async create(params: VicepresidenciaEjecutivaParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = VicepresidenciaEjecutiva.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({
						id: new VicepresidenciaEjecutivaId(params.id).value,
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
