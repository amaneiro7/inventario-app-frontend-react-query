import { type AppSettingsDto } from '../domain/dto/AppSettings.dto'
import { type AppSettingsGetAllowedDomainsRepository } from '../domain/repository/AppSettingsGetAllowedDomainsRepository'

/**
 * Service class for retrieving a single Directiva entity by its ID.
 * It extends GetBaseService, providing generic functionality for fetching a single record
 * of type DirectivaDto using a DirectivaId primitive as the identifier.
 */
export class AppSettingsGetAllowedDomains {
	constructor(private readonly repository: AppSettingsGetAllowedDomainsRepository) {}

	async execute(): Promise<AppSettingsDto> {
		return await this.repository.getByKey()
	}
}
