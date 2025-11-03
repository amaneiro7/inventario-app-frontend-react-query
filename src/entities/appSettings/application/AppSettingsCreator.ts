import { EventManager } from "@/entities/shared/domain/Observer/EventManager"
import { AppSettingsSaveRepository } from "../domain/repository/AppSettingsSaveRepository"
import { AppSettingsParams } from "../domain/dto/AppSettings.dto"
import { AppSettings } from "../domain/entity/AppSettings"

/**
 * Service class responsible for creating and updating Directiva entities.
 * It interacts with a DirectivaSaveRepository to persist data and an EventManager to notify about operation status.
 */
export class AppSettingsCreator {
	/**
	 * Constructs a DirectivaCreator instance.
	 * @param repository - The repository responsible for saving and updating directiva data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		readonly repository: AppSettingsSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Creates a new directiva or updates an existing one based on the provided parameters.
	 * It constructs a Directiva entity, converts it to primitives, and then uses the repository
	 * to save or update the data. Event notifications are sent for loading, success, and error states.
	 * @param params - The parameters for creating or updating a directiva. If `params.id` is provided,
	 *                 an update operation is performed; otherwise, a new directiva is created.
	 * @returns A Promise that resolves to the result of the save or update operation.
	 * @throws Error if the operation fails, with a message indicating the cause.
	 */
	async create(params: AppSettingsParams | AppSettingsParams[]) {
		// Notify that the creation or update process has started
		this.events.notify({ type: 'loading' })
		try {
			const payload = AppSettings.create(params).toPrimitives()
			const result = Array.isArray(params)
				? await this.repository.update({ id: new AppSettingsKey(params.id).value, payload })
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
