import { fetching } from '@/shared/api/api'
import { appSettingsUrl } from '../../domain/entity/baseUrl'
import { type AppSettingsDto } from '../../domain/dto/AppSettings.dto'
import { type AppSettingsGetAllRepository } from '../../domain/repository/AppSettingsGetAllRepository'

/**
 * Implementation of the AppSettingsGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all AppSettings data from the API, optionally with query parameters.
 */
export class AppSettingsGetAllService implements AppSettingsGetAllRepository {
	/**
	 * Retrieves all AppSettingss, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of AppSettingsDto.
	 */
	async getAll(): Promise<AppSettingsDto[]> {
		return await fetching({
			url: appSettingsUrl,
			method: 'GET'
		})
	}
}
