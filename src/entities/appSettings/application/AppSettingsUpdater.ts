import { AppSettings } from '../domain/entity/AppSettings'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type AppSettingsSaveRepository } from '../domain/repository/AppSettingsSaveRepository'
import { type AppSettingsParams } from '../domain/dto/AppSettings.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AppSettingsKey } from '../domain/value-object/AppSettingsKey'

/**
 * Service class responsible for updating AppSettings entities.
 * It interacts with a AppSettingsSaveRepository to persist data and an EventManager to notify about operation status.
 */
export class AppSettingsUpdater {
	/**
	 * Constructs a AppSettingsUpdater instance.
	 * @param repository - The repository responsible for saving and updating appSettings data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		readonly repository: AppSettingsSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Updates an existing appSetting.
	 * It constructs a AppSettings entity, converts it to primitives, and then uses the repository
	 * to update the data. Event notifications are sent for loading, success, and error states.
	 * @param params - The parameters for updating a appSetting. If `params.key` is provided,
	 *                 an update operation is performed.
	 * @returns A Promise that resolves to the result of the save or update operation.
	 * @throws Error if the operation fails, with a message indicating the cause.
	 */
	async update(params: AppSettingsParams & { key: Primitives<AppSettingsKey> }) {
		// Notify that the creation or update process has started
		this.events.notify({ type: 'loading' })
		try {
			const payload = AppSettings.create(params).toPrimitives()
			const result = await this.repository.update({ key: params.key, payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			throw error
		}
	}

	async updateMultiple(settings: (AppSettingsParams & { key: Primitives<AppSettingsKey> })[]) {
		this.events.notify({ type: 'loading' })
		try {
			const settingsToUpdate = settings.map(setting =>
				AppSettings.create(setting).toPrimitives()
			)
			const result = await this.repository.updateMultiple({ settings: settingsToUpdate })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			throw error
		}
	}
}
