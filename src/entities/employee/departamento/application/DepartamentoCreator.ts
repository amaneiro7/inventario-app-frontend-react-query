import { Departamento } from '../domain/entity/Departamento'
import { DepartamentoId } from '../domain/value-object/DepartamentoId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type DepartamentoSaveRepository } from '../domain/repository/DepartamentoSaveRepository'
import { type DepartamentoParams } from '../domain/dto/Departamento.dto'

/**
 * Service class responsible for creating and updating Departamento entities.
 * It interacts with a DepartamentoSaveRepository to persist data and an EventManager to notify about operation status.
 */
export class DepartamentoCreator {
	/**
	 * Constructs a DepartamentoCreator instance.
	 * @param repository - The repository responsible for saving and updating departamento data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		readonly repository: DepartamentoSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Creates a new departamento or updates an existing one based on the provided parameters.
	 * It constructs a Departamento entity, converts it to primitives, and then uses the repository
	 * to save or update the data. Event notifications are sent for loading, success, and error states.
	 * @param params - The parameters for creating or updating a departamento. If `params.id` is provided,
	 *                 an update operation is performed; otherwise, a new departamento is created.
	 * @returns A Promise that resolves to the result of the save or update operation.
	 * @throws Error if the operation fails, with a message indicating the cause.
	 */
	async create(params: DepartamentoParams) {
		// Notify that the creation or update process has started
		this.events.notify({ type: 'loading' })
		try {
			const payload = Departamento.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new DepartamentoId(params.id).value, payload })
				: await this.repository.save({ payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notify the error and throw an exception.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			throw error
		}
	}
}
