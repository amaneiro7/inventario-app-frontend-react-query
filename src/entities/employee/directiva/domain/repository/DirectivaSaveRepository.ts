import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DirectivaPrimitives } from '../dto/Directiva.dto'
import { type DirectivaId } from '../value-object/DirectivaId'

/**
 * Abstract class for a repository that provides methods for saving (creating and updating) Directiva entities.
 * It extends the generic `SaveRepository` with `Primitives<DirectivaId>` as the ID type and `DirectivaPrimitives` as the entity type.
 */
export abstract class DirectivaSaveRepository extends SaveRepository<
	Primitives<DirectivaId>,
	DirectivaPrimitives
> {}