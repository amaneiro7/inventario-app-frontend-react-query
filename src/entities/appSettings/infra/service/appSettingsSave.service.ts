import { fetching } from '@/shared/api/api'
import { type AppSettingsSaveRepository } from '../../domain/repository/AppSettingsSaveRepository'
import { type AppSettingsPrimitives } from '../../domain/dto/AppSettings.dto'
import { appSettingsUrl } from '../../domain/entity/baseUrl'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AppSettingsKey } from '../../domain/value-object/AppSettingsKey'

/**
 * Implementation of the AppSettingsSaveRepository interface using the fetching utility.
 * This service is responsible for updating appSettings data via the API.
 */
export class AppSettingsSaveService implements AppSettingsSaveRepository {
	/**
	 * Updates an existing appSetting record.
	 * @param params - An object containing the key of the appSetting to update and the payload.
	 * @param params.key - The key of the appSetting to update.
	 * @param params.payload - The AppSettingsPrimitives object containing the updated appSetting data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async update({
		key,
		payload
	}: {
		key: Primitives<AppSettingsKey>
		payload: AppSettingsPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${appSettingsUrl}/${key}`,
			data: payload
		})
	}

	/**
	 * Updates multiple existing appSetting records.
	 * @param params - An object containing the settings to update.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async updateMultiple({
		settings
	}: {
		settings: AppSettingsPrimitives[]
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${appSettingsUrl}/bulk-update`,
			data: settings
		})
	}
}
