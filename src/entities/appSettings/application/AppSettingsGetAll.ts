import { type AppSettingsDto } from '../domain/dto/AppSettings.dto'
import { type AppSettingsGetAllRepository } from '../domain/repository/AppSettingsGetAllRepository'

/**
 * Service class for retrieving all Directiva entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type DirectivaDto.
 */
export class AppSettingsGetAll {
	constructor(private readonly repository: AppSettingsGetAllRepository) {}

	async execute(): Promise<AppSettingsDto[]> {
		return await this.repository.getAll()
	}
}
