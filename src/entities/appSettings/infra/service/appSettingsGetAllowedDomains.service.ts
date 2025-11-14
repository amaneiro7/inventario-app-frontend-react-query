import { fetching } from '@/shared/api/api'
import { appSettingsUrl } from '../../domain/entity/baseUrl'
import { type AppSettingsDto } from '../../domain/dto/AppSettings.dto'
import { type AppSettingsGetAllowedDomainsRepository } from '../../domain/repository/AppSettingsGetAllowedDomainsRepository'

/**
 * Implementation of the AppSettingsGetRepository interface using the fetching utility.
 * This service is responsible for retrieving AppSettings data from the API.
 */
export class AppSettingsGetAllowedDomainsService implements AppSettingsGetAllowedDomainsRepository {
	/**
	 * Retrieves a AppSettings by its ID.
	 * @param params - An object containing the ID of the AppSettings to retrieve.
	 * @param params.key - The primitive value of the AppSettingskey.
	 * @returns A Promise that resolves to the AppSettingsDto.
	 */
	async getByKey(): Promise<AppSettingsDto> {
		return await fetching<AppSettingsDto>({
			url: `${appSettingsUrl}/allowed-domains`,
			method: 'GET'
		})
	}
}
