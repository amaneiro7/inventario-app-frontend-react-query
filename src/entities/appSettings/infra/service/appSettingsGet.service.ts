import { fetching } from '@/shared/api/api'
import { appSettingsUrl } from '../../domain/entity/baseUrl'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AppSettingsDto } from '../../domain/dto/AppSettings.dto'
import { type AppSettingsGetRepository } from '../../domain/repository/AppSettingsGetRepository'
import { type AppSettingsKey } from '../../domain/value-object/AppSettingsKey'

/**
 * Implementation of the AppSettingsGetRepository interface using the fetching utility.
 * This service is responsible for retrieving AppSettings data from the API.
 */
export class AppSettingsGetService implements AppSettingsGetRepository {
	/**
	 * Retrieves a AppSettings by its ID.
	 * @param params - An object containing the ID of the AppSettings to retrieve.
	 * @param params.key - The primitive value of the AppSettingskey.
	 * @returns A Promise that resolves to the AppSettingsDto.
	 */
	async getByKey({ key }: { key: Primitives<AppSettingsKey> }): Promise<AppSettingsDto> {
		return await fetching<AppSettingsDto>({
			url: `${appSettingsUrl}/${key}`,
			method: 'GET'
		})
	}
}
