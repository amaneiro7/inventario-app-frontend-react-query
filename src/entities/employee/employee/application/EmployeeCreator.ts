import { Employee } from '../domain/entity/Employee'
import { EmployeeId } from '../domain/value-object/EmployeeId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type EmployeeSaveRepository } from '../domain/repository/EmployeeSaveRepository'
import { type EmployeeParams } from '../domain/dto/Employee.dto'

/**
 * Service class responsible for creating and updating Employee entities.
 * It interacts with an EmployeeSaveRepository to persist data and an EventManager to notify about operation status.
 */
export class EmployeeCreator {
	/**
	 * Constructs an EmployeeCreator instance.
	 * @param repository - The repository responsible for saving and updating employee data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		readonly repository: EmployeeSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Creates a new employee or updates an existing one based on the provided parameters.
	 * It constructs an Employee entity, converts it to primitives, and then uses the repository
	 * to save or update the data. Event notifications are sent for loading, success, and error states.
	 * @param params - The parameters for creating or updating an employee. If `params.id` is provided,
	 *                 an update operation is performed; otherwise, a new employee is created.
	 * @returns A Promise that resolves to the result of the save or update operation.
	 * @throws Error if the operation fails, with a message indicating the cause.
	 */
	async create(params: EmployeeParams) {
		// Notify that the creation or update process has started
		this.events.notify({ type: 'loading' })
		try {
			// Create the model payload.
			const payload = Employee.create(params).toPrimitives()

			const result = params.id
				? await this.repository.update({ id: new EmployeeId(params.id).value, payload })
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
