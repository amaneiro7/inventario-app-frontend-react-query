import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UnidadPrimitives } from '../dto/Unidad.dto'
import { type UnidadId } from '../value-object/UnidadId'

/**
 * Abstract class for a repository that provides methods for saving (creating and updating) Unidad entities.
 * It extends the generic `SaveRepository` with `Primitives<UnidadId>` as the ID type and `UnidadPrimitives` as the entity type.
 */
export abstract class UnidadSaveRepository extends SaveRepository<
	Primitives<UnidadId>,
	UnidadPrimitives
> {}
