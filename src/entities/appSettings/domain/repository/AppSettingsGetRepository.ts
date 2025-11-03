import { type AppSettingsDto } from '../dto/AppSettings.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AppSettingsKey } from '../value-object/AppSettingsKey'

/**
 * Abstract class for a repository that provides methods for retrieving a single Directiva entity.
 * It extends the generic `GetRepository` with `Primitives<DirectivaId>` as the ID type and `DirectivaDto` as the entity type.
 */
export abstract class AppSettingsGetRepository {
	abstract getByKey({ key }: { key: Primitives<AppSettingsKey> }): Promise<AppSettingsDto>
}
