import { type AppSettingsDto } from '../dto/AppSettings.dto'

/**
 * Abstract class for a repository that provides methods for retrieving a single Directiva entity.
 * It extends the generic `GetRepository` with `Primitives<DirectivaId>` as the ID type and `DirectivaDto` as the entity type.
 */
export abstract class AppSettingsGetAllowedDomainsRepository {
	abstract getByKey(): Promise<AppSettingsDto>
}
