import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type DirectivaDto } from '../dto/Directiva.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DirectivaId } from '../value-object/DirectivaId'

/**
 * Abstract class for a repository that provides methods for retrieving a single Directiva entity.
 * It extends the generic `GetRepository` with `Primitives<DirectivaId>` as the ID type and `DirectivaDto` as the entity type.
 */
export abstract class DirectivaGetRepository extends GetRepository<
	Primitives<DirectivaId>,
	DirectivaDto
> {}