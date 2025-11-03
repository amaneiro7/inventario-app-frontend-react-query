import { type AppSettingsDto } from '../dto/AppSettings.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all Directiva entities.
 * It extends the generic `GetAllRepository` with `DirectivaDto` as the type parameter.
 */
export abstract class AppSettingsGetAllRepository {
	abstract getAll(): Promise<AppSettingsDto[]>
}
