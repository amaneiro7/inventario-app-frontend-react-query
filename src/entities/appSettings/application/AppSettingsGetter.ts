import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AppSettingsDto } from '../domain/dto/AppSettings.dto'
import { type AppSettingsKey } from '../domain/value-object/AppSettingsKey'
import { type AppSettingsGetRepository } from '../domain/repository/AppSettingsGetRepository'

/**
 * Service class for retrieving a single Directiva entity by its ID.
 * It extends GetBaseService, providing generic functionality for fetching a single record
 * of type DirectivaDto using a DirectivaId primitive as the identifier.
 */
export class AppSettingsGetter {
	constructor(private readonly repository: AppSettingsGetRepository) {}

	async execute({ key }: { key: Primitives<AppSettingsKey> }): Promise<AppSettingsDto> {
		return await this.repository.getByKey({ key })
	}
}
