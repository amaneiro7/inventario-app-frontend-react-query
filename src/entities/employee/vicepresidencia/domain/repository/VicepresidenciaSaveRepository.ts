import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaPrimitives } from '../dto/Vicepresidencia.dto'
import { type VicepresidenciaId } from '../value-object/VicepresidenciaId'

/**
 * Abstract class for a repository that provides methods for saving (creating and updating) Vicepresidencia entities.
 * It extends the generic `SaveRepository` with `Primitives<VicepresidenciaId>` as the ID type and `VicepresidenciaPrimitives` as the entity type.
 */
export abstract class VicepresidenciaSaveRepository extends SaveRepository<
	Primitives<VicepresidenciaId>,
	VicepresidenciaPrimitives
> {}